import {
  ref,
  watch,
  readonly,
  Ref,
  isRef,
} from 'vue'


interface DraggableResult {
  draggingX: Ref<number>
  draggingY: Ref<number>
  elementRef: Ref<HTMLElement | null>
  containerRef: Ref<HTMLElement | null>
  reset(): void
}

// 当前某个元素被拖拽时鼠标的偏移量
export const useDraggable = (draggable: Ref<boolean> | boolean = true): DraggableResult => {
  // X，Y 偏移量
  const draggingX = ref(0);
  const draggingY = ref(0);
  const reset = () => {
    draggingX.value = 0;
    draggingY.value = 0;
  }

  // 获取可拖拽范围需要用的元素
  const elementRef = ref<HTMLElement | null>();
  // 获取拖拽边界范围需要用的元素
  const containerRef = ref<HTMLElement | null>();
  // 是否允许拖拽
  const enabledDragging = isRef(draggable) ? draggable : ref(draggable);

  // 可视化
  watch([containerRef, elementRef], ([container, target], ov, onInvalidate) => {
    if (!(target instanceof HTMLElement && container instanceof HTMLElement)) {
      return;
    }
    const body = window.document.body;
    let startX = 0;
    let startY = 0;
    let prevDraggingX = 0;
    let prevDraggingY = 0;
    let containerRect = container.getBoundingClientRect();
    let bodyRect = body.getBoundingClientRect();
    let isDown = false;
    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      if (!enabledDragging.value) {
        return;
      }
      startX = event.clientX;
      startY = event.clientY;
      // 只拿最新的
      const targetRect = target.getBoundingClientRect();
      // 判断鼠标点是否在 target 元素内
      if (
        event.target === target &&
        targetRect.x < startX &&
        targetRect.y < startY &&
        (targetRect.width + targetRect.x) >= startX &&
        (targetRect.height + targetRect.y) >= startY
      ) {
        isDown = true;
        prevDraggingX = draggingX.value;
        prevDraggingY = draggingY.value;
        bodyRect = body.getBoundingClientRect();
        containerRect = container.getBoundingClientRect();
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      if (!isDown) {
        return;
      }
      const currentX = prevDraggingX + event.clientX - startX;
      const currentY = prevDraggingY + event.clientY - startY;
      const containerOriginX = containerRect.x - prevDraggingX;
      const containerOriginY = containerRect.y - prevDraggingY;
      draggingX.value = getRangeValueOf(currentX, -containerOriginX, bodyRect.width - containerRect.width - containerOriginX);
      draggingY.value = getRangeValueOf(currentY, -containerOriginY, bodyRect.height - containerRect.height - containerOriginY);
    }

    const handleMouseUp = (event: MouseEvent) => {
      event.preventDefault();
      if (!isDown) {
        return;
      }
      isDown = false;
    }

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    onInvalidate(() => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    });
  });

  return {
    draggingX: readonly(draggingX),
    draggingY: readonly(draggingY),
    elementRef,
    containerRef,
    reset
  }
}


const getRangeValueOf = (value: number, min: number, max: number) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}
