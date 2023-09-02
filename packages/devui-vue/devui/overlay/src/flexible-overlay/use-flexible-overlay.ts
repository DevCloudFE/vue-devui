import { ref, unref, watch, nextTick, onUnmounted, computed, toRefs } from 'vue';
import { arrow, autoPlacement, computePosition, offset, shift, flip } from '@floating-ui/dom';
import { FlexibleOverlayProps, Placement, Point, EmitEventFn, Rect } from './flexible-overlay-types';
import { getScrollParent } from './utils';

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

export function useOverlay(props: FlexibleOverlayProps, emit: EmitEventFn) {
  const { fitOriginWidth, autoUpdatePosition, align, position, showArrow, shiftOffset, placeStrategy } = toRefs(props);
  const overlayRef = ref<HTMLElement | undefined>();
  const arrowRef = ref<HTMLElement | undefined>();
  const showOverlay = ref(false);
  const overlayWidth = ref(0)
  const baseOption = { strategy: 'fixed' }
  const baseMiddleware = [offset(props.offset)]
  let originParent: HTMLElement;
  let rect: DOMRect
  let originObserver: ResizeObserver
  let overlayObserver: ResizeObserver
  const styles = computed(() => {
    if (fitOriginWidth.value) {
      return { width: overlayWidth.value + 'px' }
    } else {
      return {}
    }
  })

  const generateMostSpaceOptions = () => {
    const middleware = [
      ...baseMiddleware,
      autoPlacement({
        alignment: align.value,
        allowedPlacements: position.value,
      })
    ];
    if (showArrow.value) {
      middleware.push(arrow({ element: arrowRef.value! }))
    }
    if (shiftOffset?.value !== undefined) {
      middleware.push(shift())
    }
    return { ...baseOption, middleware }
  };

  const generateNoSpaceOptions = () => {
    const [mainPostion, ...fallbackPostion] = position.value
    const middleware = [...baseMiddleware];
    if (showArrow.value) {
      middleware.push(arrow({ element: arrowRef.value! }))
    }
    middleware.push(fallbackPostion.length ? flip({ fallbackPlacements: fallbackPostion }) : flip());
    return { ...baseOption, placement: mainPostion, middleware }
  }

  const optionMap = {
    'most-space': generateMostSpaceOptions,
    'no-space': generateNoSpaceOptions,
  }

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
    const hostEl = <HTMLElement>(props.origin?.$el ?? props.origin);
    const overlayEl = <HTMLElement>unref(overlayRef.value);
    const arrowEl = <HTMLElement>unref(arrowRef.value);
    if (!hostEl || !overlayEl) {
      return;
    }
    const { x, y, placement, middlewareData } = await computePosition(hostEl, overlayEl, optionMap[placeStrategy.value]);
    let applyX = x;
    let applyY = y;
    if (placeStrategy.value === 'most-space' && props.shiftOffset !== undefined) {
      const { x: shiftX, y: shiftY } = middlewareData.shift;
      shiftX < 0 && (applyX -= props.shiftOffset);
      shiftX > 0 && (applyX += props.shiftOffset);
      shiftY < 0 && (applyY -= props.shiftOffset);
      shiftY > 0 && (applyY += props.shiftOffset);
    }
    emit('positionChange', placement);
    Object.assign(overlayEl.style, { top: `${applyY}px`, left: `${applyX}px` });
    props.showArrow && updateArrowPosition(arrowEl, placement, middlewareData.arrow, overlayEl);
  };

  const scrollCallBack = (e: Event) => {
    const scrollElement = e.target as HTMLElement;
    if (scrollElement?.contains(props.origin?.$el ?? props.origin)) {
      if (props.appendToBodyScrollStrategy === 'repostion') {
        updatePosition()
      }
      if (props.appendToBodyScrollStrategy === 'close') {
        showOverlay.value = false;
        emit('update:modelValue', false)
      }
    }
  }

  const updateWidth = (originEl: Element) => {
    overlayWidth.value = originEl.getBoundingClientRect().width;
    updatePosition()
  };

  const observeOrigin = () => {
    if (fitOriginWidth.value && typeof window !== 'undefined') {
      const originEl = props.origin?.$el ?? props.origin
      if (originEl) {
        originObserver = new window.ResizeObserver(() => updateWidth(originEl))
        originObserver.observe(originEl)
      }
    }
  }

  const unobserveOrigin = () => {
    const originEl = props.origin?.$el ?? props.origin
    originEl && originObserver?.unobserve(originEl)
  }

  const observeOverlay = () => {
    if (autoUpdatePosition.value && typeof window !== 'undefined') {
      overlayObserver = new window.ResizeObserver(updatePosition)
      originObserver.observe(overlayRef.value)
    }
  }
  const unobserveOverlay = () => {
    overlayRef.value && overlayObserver?.unobserve(overlayRef.value)
  }


  const checkBounds = (rect: DOMRect, scrollElement: HTMLElement) => {
    if (!scrollElement.getBoundingClientRect) {
      return false;
    }
    if (props.scrollElement) {
      const containerRect = scrollElement.getBoundingClientRect()
      const positionFixArr = [rect.height, 0, 0, 0];
      const bounds = [
        Math.round(rect.top + positionFixArr[0]) >= Math.round(containerRect.top),
        Math.round(rect.right + positionFixArr[1]) <= Math.round(containerRect.right),
        Math.round(rect.bottom + positionFixArr[2]) <= Math.round(containerRect.bottom),
        Math.round(rect.left + positionFixArr[3]) >= Math.round(containerRect.left),
      ]
      if (bounds.includes(false)) {
        return true;
      }
    }
    return false;
  };
  watch([() => props.modelValue, () => props.origin], () => {
    if (props.modelValue && props.origin) {
      originParent =
        !props.scrollElement || props.scrollElement === 'auto'
          ? (getScrollParent((props.origin.$el ?? props.origin) as HTMLElement) as HTMLElement)
          : props.scrollElement;
      rect = ((props.origin.$el ?? props.origin) as HTMLElement).getBoundingClientRect()
      if (checkBounds(rect, originParent)) {
        showOverlay.value = false;
        nextTick(() => {
          emit('update:modelValue', false)
        })
        return
      }
      showOverlay.value = true
      nextTick(updatePosition);
      window.addEventListener('scroll', scrollCallBack, true);
      window.addEventListener('resize', updatePosition);
      observeOrigin()
      nextTick(observeOverlay)
    } else {
      showOverlay.value = false;
      originParent?.removeEventListener('scroll', scrollCallBack, true);
      originParent?.removeEventListener('resize', updatePosition);
      unobserveOrigin()
      unobserveOverlay()
    }
  }
  );
  onUnmounted(() => {
    showOverlay.value = false;
    originParent?.removeEventListener('scroll', scrollCallBack, true);
    originParent?.removeEventListener('resize', updatePosition);
    unobserveOrigin()
    unobserveOverlay()

  });

  return { arrowRef, overlayRef, styles, showOverlay, updatePosition };
}
