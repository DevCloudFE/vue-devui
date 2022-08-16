import { createContainer } from './utils/create-container-element';
import { createRippleElement } from './utils/create-ripple-element';
import { getDistanceToFurthestCorner } from './utils/getdistance-tofurthestcorner';
import { getRelativePointer } from './utils/getrelative-pointer';
import { decrementRippleCount, deleteRippleCount, getRippleCount, incrementRippleCount } from './utils/ripple-count';
import { IRippleDirectiveOptions } from './options';
// Ensure that the current element can be completely overwritten
// const MULTIPLE_NUMBER = 1;
const ripple = (event: PointerEvent, el: HTMLElement, options: IRippleDirectiveOptions): void => {
  // Get Click element
  const rect = el.getBoundingClientRect();
  // Get all styles of the currently clicked element
  const computedStyles = window.getComputedStyle(el);
  // Create a hole ripple element 覆盖一个容器在el上面
  const rippleContainer = createContainer(computedStyles);
  // Get the current mouse click location
  const { x, y } = getRelativePointer(event, rect);
  // 利用勾股定理获取鼠标点击处到el四个角的直线距离， size 就是我们点击的位置距离整个el最远的点
  // const size = MULTIPLE_NUMBER * getDistanceToFurthestCorner(x, y, rect);
  const size = getDistanceToFurthestCorner(x, y, rect);
  const rippleEl = createRippleElement(x, y, size, options, rect);
  // 原始位置
  let originalPositionValue = '';
  // 是否需要移除ripple Do you need to remove ripple
  let shouldDissolveRipple = false;
  let token: number | null = null;
  // function transform(el: HTMLElement, value: string) {
  //   el.style.transform = value;
  // }
  // 移除方法
  function dissolveRipple() {
    rippleEl.style.transition = 'opacity 120ms ease-in-out';
    rippleEl.style.opacity = '0';
    setTimeout(() => {
      rippleContainer.remove();
      decrementRippleCount(el);
      if (getRippleCount(el) === 0) {
        deleteRippleCount(el);
        el.style.position = originalPositionValue;
      }
    }, 120);
  }
  // 释放方法
  function releaseRipple(e?: PointerEvent) {
    if (typeof e !== 'undefined') {
      document.removeEventListener('pointerup', releaseRipple);
      document.removeEventListener('pointercancel', releaseRipple);
    }

    if (shouldDissolveRipple) {
      dissolveRipple();
    } else {
      shouldDissolveRipple = true;
    }
  }

  function cancelRipple() {
    clearTimeout(token);
    rippleContainer.remove();
    document.removeEventListener('pointerup', releaseRipple);
    document.removeEventListener('pointercancel', releaseRipple);
    document.removeEventListener('pointercancel', cancelRipple);
  }

  // 设置ripple 的 dataset[RIPPLE_COUNT]
  incrementRippleCount(el);

  // 给el添加 相对定位 修改 默认值 static
  if (computedStyles.position === 'static') {
    if (el.style.position) {
      originalPositionValue = el.style.position;
    }
    el.style.position = 'relative';
  }

  rippleContainer.appendChild(rippleEl);
  el.appendChild(rippleContainer);

  document.addEventListener('pointerup', releaseRipple);
  document.addEventListener('pointercancel', releaseRipple);

  token = setTimeout(() => {
    document.removeEventListener('pointercancel', cancelRipple);
    rippleEl.style.transform = `translate(-50%,-50%) scale(2)`;
    rippleEl.style.opacity = `${options.finalOpacity}`;
    setTimeout(() => releaseRipple(), options.duration);
  }, options.delay);
  document.addEventListener('pointercancel', cancelRipple);
};

export { ripple };
