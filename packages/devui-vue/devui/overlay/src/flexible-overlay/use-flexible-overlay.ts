import { ref, unref, watch, nextTick, onUnmounted } from 'vue';
import { arrow, autoPlacement, computePosition, offset, shift } from '@floating-ui/dom';
import { FlexibleOverlayProps, Placement, Point, UseOverlayFn, EmitEventFn, Rect } from './flexible-overlay-types';
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

export function useOverlay(props: FlexibleOverlayProps, emit: EmitEventFn): UseOverlayFn {
  const overlayRef = ref<HTMLElement | undefined>();
  const arrowRef = ref<HTMLElement | undefined>();
  let originParent = null;
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
    const middleware = [
      offset(props.offset),
      autoPlacement({
        alignment: props.align,
        allowedPlacements: props.position,
      }),
    ];
    props.showArrow && middleware.push(arrow({ element: arrowEl }));
    props.shiftOffset !== undefined && middleware.push(shift());
    const { x, y, placement, middlewareData } = await computePosition(hostEl, overlayEl, {
      strategy: 'fixed',
      middleware,
    });
    let applyX = x;
    let applyY = y;
    if (props.shiftOffset !== undefined) {
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
  watch(
    () => props.modelValue,
    () => {
      if (props.modelValue && props.origin) {
        originParent = getScrollParent(props.origin);
        nextTick(updatePosition);
        originParent?.addEventListener('scroll', updatePosition);
        originParent !== window && window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);
      } else {
        originParent?.removeEventListener('scroll', updatePosition);
        originParent !== window && window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      }
    }
  );
  onUnmounted(() => {
    originParent?.removeEventListener('scroll', updatePosition);
    originParent !== window && window.removeEventListener('scroll', updatePosition);
    window.removeEventListener('resize', updatePosition);
  });

  return { arrowRef, overlayRef, updatePosition };
}
