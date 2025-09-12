import { onBeforeUnmount, onMounted, watchEffect, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';
function addUnit(value?: string | number, defaultUnit = 'px'): string {
  if (!value) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return `${value}${defaultUnit}`;
  } else {
    return '';
  }
}

interface Draggable {
  clearPosition: () => void;
  modalPosition: Ref<string>;
}

export const useDraggable = (
  targetRef: Ref<HTMLElement | undefined>,
  dragRef: Ref<HTMLElement | undefined>,
  draggable: ComputedRef<boolean>
): Draggable => {
  const modalPosition = ref('translate(-50%, -50%)');

  let transform = {
    offsetX: 0,
    offsetY: 0,
  };

  const onMousedown = (e: MouseEvent) => {
    const downX = e.clientX;
    const downY = e.clientY;
    const { offsetX, offsetY } = transform;

    const targetRect = (targetRef.value as HTMLElement).getBoundingClientRect();
    const targetLeft = targetRect.left;
    const targetTop = targetRect.top;
    const targetWidth = targetRect.width;
    const targetHeight = targetRect.height;

    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;

    const minLeft = -targetLeft + offsetX;
    const minTop = -targetTop + offsetY;
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
    const maxTop = clientHeight - targetTop - targetHeight + offsetY;

    const onMousemove = (ev: MouseEvent) => {
      const moveX = Math.min(Math.max(offsetX + ev.clientX - downX, minLeft), maxLeft);
      const moveY = Math.min(Math.max(offsetY + ev.clientY - downY, minTop), maxTop);
      transform = {
        offsetX: moveX,
        offsetY: moveY,
      };
      modalPosition.value = `translate(calc(-50% + ${addUnit(moveX)}), calc(-50% + ${addUnit(moveY)}))`;
    };

    const onMouseup = () => {
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('mouseup', onMouseup);
    };

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('mouseup', onMouseup);
  };

  const onDraggable = () => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.addEventListener('mousedown', onMousedown);
    }
  };

  const offDraggable = () => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.removeEventListener('mousedown', onMousedown);
    }
  };

  onMounted(() => {
    watchEffect(() => {
      if (draggable.value) {
        onDraggable();
      } else {
        offDraggable();
      }
    });
  });

  onBeforeUnmount(() => {
    offDraggable();
  });

  const clearPosition = () => {
    transform = {
      offsetX: 0,
      offsetY: 0,
    };
    modalPosition.value = 'translate(-50%, -50%)';
  };

  return {
    clearPosition,
    modalPosition,
  };
};
