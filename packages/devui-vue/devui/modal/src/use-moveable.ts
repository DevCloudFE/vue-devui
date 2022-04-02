import {
  ref,
  watch,
  readonly,
  Ref,
  isRef,
} from 'vue';

export interface MoveableResult {
  movingX: Ref<number>;
  movingY: Ref<number>;
  // 可拖拽的元素
  handleRef: Ref<HTMLElement | null | undefined>;
  // 可移动的元素
  moveElRef: Ref<HTMLElement | null | undefined>;
  reset(): void;
}

const getRangeValueOf = (value: number, min: number, max: number) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

// 当前某个元素被拖拽时鼠标的偏移量
export const useMoveable = (moveable: Ref<boolean> | boolean = true): MoveableResult => {
  // X，Y 偏移量
  const movingX = ref(0);
  const movingY = ref(0);
  const reset = () => {
    movingX.value = 0;
    movingY.value = 0;
  };

  // 可拖拽的元素
  const handleRef = ref<HTMLElement | null>();
  // 可移动的元素
  const moveElRef = ref<HTMLElement | null>();
  // 是否允许拖拽
  const enabledMoving = isRef(moveable) ? moveable : ref(moveable);

  // 可视化
  watch([moveElRef, handleRef], ([container, target], ov, onInvalidate) => {
    if (!(target instanceof HTMLElement && container instanceof HTMLElement)) {
      return;
    }
    // 更改为拖动样式
    target.style.cursor = 'all-scroll';

    // 初始化内容
    let startX = 0;
    let startY = 0;
    let prevMovingX = 0;
    let prevMovingY = 0;
    let containerRect = container.getBoundingClientRect();
    let bodyRect = document.body.getBoundingClientRect();
    let isDown = false;

    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      if (!enabledMoving.value) {
        return;
      }
      startX = event.clientX;
      startY = event.clientY;
      // 只拿最新的
      const targetRect = target.getBoundingClientRect();
      // 判断鼠标点是否在 target 元素内
      if (
        (target === event.target || target.contains(event.target as Node)) &&
        targetRect.x < startX &&
        targetRect.y < startY &&
        (targetRect.width + targetRect.x) >= startX &&
        (targetRect.height + targetRect.y) >= startY
      ) {
        isDown = true;
        prevMovingX = movingX.value;
        prevMovingY = movingY.value;
        bodyRect = document.body.getBoundingClientRect();
        containerRect = container.getBoundingClientRect();
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      if (!isDown) {
        return;
      }
      const currentX = prevMovingX + event.clientX - startX;
      const currentY = prevMovingY + event.clientY - startY;
      const containerOriginX = containerRect.x - prevMovingX;
      const containerOriginY = containerRect.y - prevMovingY;
      movingX.value = getRangeValueOf(currentX, -containerOriginX, bodyRect.width - containerRect.width - containerOriginX);
      movingY.value = getRangeValueOf(currentY, -containerOriginY, bodyRect.height - containerRect.height - containerOriginY);
    };

    const handleMouseUp = (event: MouseEvent) => {
      event.preventDefault();
      if (!isDown) {
        return;
      }
      isDown = false;
    };

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
    movingX: readonly(movingX),
    movingY: readonly(movingY),
    handleRef,
    moveElRef,
    reset
  };
};
