import type { Ref } from 'vue';
import { watch, onMounted } from 'vue';

const SMOOTH_PTG = 14 / 15;
export default function useMobileTouchMove(
  inVirtual: Ref<boolean>,
  listRef: Ref<HTMLDivElement | undefined>,
  callback: (offsetY: number, smoothOffset?: boolean) => boolean,
): void {
  let touched = false;
  let touchY = 0;
  let element: HTMLElement | null = null;
  let interval: NodeJS.Timer | null = null;

  const onTouchMove = (e: TouchEvent) => {
    if (touched) {
      const currentY = Math.ceil(e.touches[0].pageY);
      let offsetY = touchY - currentY;
      touchY = currentY;
      if (callback(offsetY)) {
        e.preventDefault();
      }
      if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(() => {
        offsetY *= SMOOTH_PTG;
        if (!callback(offsetY, true) || Math.abs(offsetY) <= 0.1) {
          if (interval) {
            clearInterval(interval);
          }
        }
      }, 16);
    }
  };

  const cleanUpEvents = () => {
    if (element) {
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', () => {
        touched = false;
        cleanUpEvents();
      });
    }
  };

  const onTouchEnd = () => {
    touched = false;
    cleanUpEvents();
  };

  const onTouchStart = (e: TouchEvent) => {
    cleanUpEvents();
    if (e.touches.length === 1 && !touched) {
      touched = true;
      touchY = Math.ceil(e.touches[0].pageY);
      element = e.target as HTMLElement;
      element.addEventListener('touchmove', onTouchMove, { passive: false });
      element.addEventListener('touchend', onTouchEnd);
    }
  };

  onMounted(() => {
    watch(
      inVirtual,
      val => {
        listRef.value?.removeEventListener('touchstart', onTouchStart);
        cleanUpEvents();
        if (interval) {
          clearInterval(interval);
        }
        if (val) {
          listRef.value?.addEventListener('touchstart', onTouchStart, { passive: false });
        }
      },
      { immediate: true },
    );
  });
}
