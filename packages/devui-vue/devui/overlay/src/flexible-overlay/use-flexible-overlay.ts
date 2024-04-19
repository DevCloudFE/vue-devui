import { ref, unref, watch, nextTick, onUnmounted, toRefs } from 'vue';
import { arrow, computePosition, offset, flip } from '@floating-ui/dom';
import { FlexibleOverlayProps, Placement, Point, UseOverlayFn, EmitEventFn, Rect } from './flexible-overlay-types';

function adjustArrowPosition(isArrowCenter: boolean, point: Point, placement: Placement, originRect: Rect): Point {
  let { x, y } = point;
  if (!isArrowCenter) {
    const { width, height } = originRect;
    if (x && placement.includes('start')) {
      x = 12;
    }
    if (x && placement.includes('end')) {
      x = Math.round(width - 24);
    }
    if (y && placement.includes('start')) {
      y = 10;
    }
    if (y && placement.includes('end')) {
      y = height - 14;
    }
  }

  return { x, y };
}

export function useOverlay(props: FlexibleOverlayProps, emit: EmitEventFn): UseOverlayFn {
  const { position, showArrow } = toRefs(props);
  const overlayRef = ref<HTMLElement | undefined>();
  const arrowRef = ref<HTMLElement | undefined>();

  const updateArrowPosition = (arrowEl: HTMLElement, placement: Placement, point: Point, overlayEl: HTMLElement) => {
    const { x, y } = adjustArrowPosition(props.isArrowCenter, point, placement, overlayEl.getBoundingClientRect());
    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[placement.split('-')[0]];
    Object.assign(arrowEl.style, {
      left: x ? `${x}px` : '',
      top: y ? `${y}px` : '',
      right: '',
      bottom: '',
      [staticSide]: '-4px',
    });
  };
  const updatePosition = async () => {
    const hostEl = <HTMLElement>props.origin;
    const overlayEl = <HTMLElement>unref(overlayRef.value);
    const arrowEl = <HTMLElement>unref(arrowRef.value);

    const [mainPosition, ...fallbackPosition] = position.value;
    const middleware = [offset(props.offset)];
    middleware.push(fallbackPosition.length ? flip({ fallbackPlacements: fallbackPosition }) : flip());
    if (showArrow.value) {
      middleware.push(arrow({ element: arrowRef.value! }));
    }
    const { x, y, placement, middlewareData } = await computePosition(hostEl, overlayEl, {
      strategy: 'fixed',
      placement: mainPosition,
      middleware,
    });
    let applyX = x;
    let applyY = y;
    emit('positionChange', placement);
    Object.assign(overlayEl.style, { top: `${applyY}px`, left: `${applyX}px` });
    props.showArrow && updateArrowPosition(arrowEl, placement, middlewareData.arrow, overlayEl);
  };

  const scrollCallback = (e: Event) => {
    const scrollElement = e.target as HTMLElement;
    if (scrollElement?.contains(props.origin?.$el ?? props.origin)) {
      updatePosition();
    }
  };
  watch(
    () => props.modelValue,
    () => {
      if (props.modelValue && props.origin) {
        nextTick(updatePosition);
        window.addEventListener('scroll', scrollCallback, true);
        window.addEventListener('resize', updatePosition);
      } else {
        window.removeEventListener('scroll', scrollCallback, true);
        window.removeEventListener('resize', updatePosition);
      }
    }
  );
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollCallback, true);
    window.removeEventListener('resize', updatePosition);
  });

  return { arrowRef, overlayRef, updatePosition };
}
