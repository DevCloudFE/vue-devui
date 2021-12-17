import {
  CSSProperties,
  defineComponent,
  isRef,
  onMounted,
  reactive,
  ref,
  renderSlot,
  toRef,
  watch,
  computed
} from 'vue';
import { CommonOverlay } from './common-overlay';
import { OriginOrDomRef, flexibleOverlayProps, FlexibleOverlayProps, Point, Origin, ConnectionPosition, overlayEmits } from './overlay-types';
import { useOverlayLogic } from './utils';

import { getElement, isComponent } from '../../shared/util/dom';

/**
 * 弹性的 Overlay，用于连接固定的和相对点
 */
export const FlexibleOverlay = defineComponent({
  name: 'DFlexibleOverlay',
  props: flexibleOverlayProps,
  emits: overlayEmits,
  setup(props: FlexibleOverlayProps, ctx) {
    // lift cycle
    const overlayRef = ref<Element | null>(null);
    const positionedStyle = reactive<CSSProperties>({ position: 'absolute' });
    onMounted(async () => {
      const handleRectChange = (position: ConnectionPosition, rect: DOMRect, origin: Origin) => {
        // TODO: add optimize for throttle
        const point = calculatePosition(position, rect, origin);

        // set the current position style's value.
        // the current position style is a 'ref'.
        positionedStyle.left = `${point.x}px`;
        positionedStyle.top = `${point.y}px`;
      };

      const locationElements = computed(() => {
        // 获取面板
        const overlay = overlayRef.value;
        // 获取原点
        const origin = getOrigin(props.origin);
        if (!overlay || !origin) {
          return;
        }
        return { origin, overlay };
      });

      const visibleRef = toRef(props, 'visible');
      const positionRef = toRef(props, 'position');

      watch([locationElements, visibleRef, positionRef], async ([locationElements, visible, position], ov, onInvalidate) => {
        if (!visible || !locationElements) {
          return;
        }
        const { origin, overlay } = locationElements;
        handleRectChange(position, overlay.getBoundingClientRect(), origin);
        const unsubscriptions = [
          subscribeLayoutEvent(() => handleRectChange(position, overlay.getBoundingClientRect(), origin)),
          subscribeOverlayResize(overlay, (entries) => handleRectChange(position, entries[0].contentRect, origin)),
          subscribeOriginResize(origin, () => handleRectChange(position, overlay.getBoundingClientRect(), origin)),
        ];
        onInvalidate(() => {
          unsubscriptions.forEach(fn => fn());
        });
      });
    });

    const {
      backgroundClass,
      overlayClass,
      handleBackdropClick,
      handleOverlayBubbleCancel
    } = useOverlayLogic(props,ctx);

    return () => (
      <CommonOverlay>
        <div
          v-show={props.visible}
          style={props.backgroundStyle}
          class={backgroundClass.value}
          onClick={handleBackdropClick}
        >
          <div
            ref={overlayRef}
            class={overlayClass.value}
            style={positionedStyle}
            onClick={handleOverlayBubbleCancel}
          >
            {renderSlot(ctx.slots, 'default')}
          </div>
        </div>
      </CommonOverlay>
    );
  },
});


/**
 * 获取原点，可能是 Element 或者 Rect
 * @param {OriginOrDomRef} origin
 * @returns {Origin}
 */
function getOrigin(origin: OriginOrDomRef): Origin {
  // Check for Element so SVG elements are also supported.
  if (origin instanceof Element) {
    return origin;
  }

  if (isRef(origin)) {
    return getElement(origin.value);
  }

  if (isComponent(origin)) {
    return getElement(origin);
  }

  // is point { x: number, y: number, width: number, height: number }
  return origin;
}

/**
 * 计算坐标系
 * @param {ConnectionPosition} position
 * @param {HTMLElement | DOMRect} panelOrRect
 * @param {Origin} origin
 * @returns
 */
function calculatePosition(
  position: ConnectionPosition,
  rect: DOMRect,
  origin: Origin
): Point {
  // get overlay rect
  const originRect = getOriginRect(origin);

  // calculate the origin point
  const originPoint = getOriginRelativePoint(originRect, position);

  // calculate the overlay anchor point
  return getOverlayPoint(originPoint, rect, position);
}

/**
 * 返回原点元素的 ClientRect
 * @param origin
 * @returns {DOMRect}
 */
function getOriginRect(origin: Origin): DOMRect {
  if (origin instanceof Element) {
    return origin.getBoundingClientRect();
  }
  // Origin is point
  const width = origin.width || 0;
  const height = origin.height || 0;

  // If the origin is a point, return a client rect as if it was a 0x0 element at the point.
  return {
    top: origin.y,
    bottom: origin.y + height,
    left: origin.x,
    right: origin.x + width,
    height,
    width,
  } as DOMRect;
}

/**
 * 获取遮罩层的左上角坐标
 * @param {Point} originPoint
 * @param {DOMRect} rect
 * @param {ConnectionPosition} position
 * @returns
 */
function getOverlayPoint(
  originPoint: Point,
  rect: DOMRect,
  position: ConnectionPosition
): Point {
  let x: number;
  const { width, height } = rect;
  if (position.overlayX == 'center') {
    x = originPoint.x - width / 2;
  } else {
    x = position.overlayX == 'left' ? originPoint.x : originPoint.x - width;
  }

  let y: number;
  if (position.overlayY == 'center') {
    y = originPoint.y - height / 2;
  } else {
    y = position.overlayY == 'top' ? originPoint.y : originPoint.y - height;
  }

  return { x, y };
}

/**
 * 获取原点相对于 position 的坐标 (x, y)
 * @param originRect
 * @param position
 * @returns
 */
function getOriginRelativePoint(
  originRect: ClientRect,
  position: ConnectionPosition
): Point {
  let x: number;
  if (position.originX == 'center') {
    x = originRect.left + originRect.width / 2;
  } else {
    const startX = originRect.left;
    const endX = originRect.right;
    x = position.originX == 'left' ? startX : endX;
  }

  let y: number;
  if (position.originY == 'center') {
    y = originRect.top + originRect.height / 2;
  } else {
    y = position.originY == 'top' ? originRect.top : originRect.bottom;
  }

  return { x, y };
}

/**
 * 订阅 layout 变化事件
 * @param event
 */
function subscribeLayoutEvent(event: (e?: Event) => void) {
  window.addEventListener('scroll', event, true);
  window.addEventListener('resize', event);
  window.addEventListener('orientationchange', event);
  return () => {
    window.removeEventListener('scroll', event, true);
    window.removeEventListener('resize', event);
    window.removeEventListener('orientationchange', event);
  }
}

function subscribeOverlayResize(overlay: Element, callback: (entries: ResizeObserverEntry[]) => void) {
  if (overlay instanceof Element) {
    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(overlay);
    return () => resizeObserver.disconnect();
  }
  return () => { };
}

function subscribeOriginResize(origin: any, callback: () => void) {
  if (origin instanceof Element) {
    // Only when the style changing, you can change the position.
    const observer = new MutationObserver(callback);
    observer.observe(origin, { attributeFilter: ['style'] });
    return () => observer.disconnect();
  }
  return () => { };
}

