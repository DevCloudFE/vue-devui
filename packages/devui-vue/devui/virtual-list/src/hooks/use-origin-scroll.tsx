import type { Ref } from 'vue';

export default (isScrollAtTop: Ref<boolean>, isScrollAtBottom: Ref<boolean>): (deltaY: number, smoothOffset: boolean) => boolean => {
  let lock = false;
  let lockTimeout: NodeJS.Timeout | null = null;
  function lockScroll() {
    if (lockTimeout) {
      clearTimeout(lockTimeout);
    }

    lock = true;

    lockTimeout = setTimeout(() => {
      lock = false;
    }, 50);
  }
  return (deltaY: number, smoothOffset = false) => {
    const originScroll =
      (deltaY < 0 && isScrollAtTop.value) ||
      (deltaY > 0 && isScrollAtBottom.value);

    if (smoothOffset && originScroll) {
      if (lockTimeout) {
        clearTimeout(lockTimeout);
      }
      lock = false;
    } else if (!originScroll || lock) {
      lockScroll();
    }

    return !lock && originScroll;
  };
};
