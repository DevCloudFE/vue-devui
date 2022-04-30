import { createContainer } from './utils/create-container-element';
import { createrippleElement } from './utils/create-ripple-element';
import { getDistanceToFurthestCorner } from './utils/getdistance-tofurthestcorner';
import { getRelativePointer } from './utils/getrelative-pointer';
import {
  decrementRippleCount,
  deleteRippleCount,
  getRippleCount,
  incrementRippleCount
} from './utils/ripple-count';
import { IRippleDirectiveOptions } from './options';
const MULTIPLE_NUMBER = 2.05;
const ripple = (
  event: PointerEvent,
  el: HTMLElement,
  options: IRippleDirectiveOptions
): void => {
  const rect = el.getBoundingClientRect();
  const computedStyles = window.getComputedStyle(el);
  const { x, y } = getRelativePointer(event, rect);
  const size = MULTIPLE_NUMBER * getDistanceToFurthestCorner(x, y, rect);

  const rippleContainer = createContainer(computedStyles);
  const rippleEl = createrippleElement(x, y, size, options);
  let originalPositionValue = '';
  let shouldDissolveripple = false;
  let token: number | null = null;
  function dissolveripple () {
    rippleEl.style.transition = 'opacity 150ms linear';
    rippleEl.style.opacity = '0';

    setTimeout(() => {
      rippleContainer.remove();

      decrementRippleCount(el);

      if (getRippleCount(el) === 0) {
        deleteRippleCount(el);
        el.style.position = originalPositionValue;
      }
    }, 150);
  }
  function releaseripple (e?: PointerEvent)  {
    if (typeof e !== 'undefined') {
      document.removeEventListener('pointerup', releaseripple);
      document.removeEventListener('pointercancel', releaseripple);
    }

    if (shouldDissolveripple) {dissolveripple();}
    else {shouldDissolveripple = true;}
  }

  function cancelripple() {
    clearTimeout(token);

    rippleContainer.remove();
    document.removeEventListener('pointerup', releaseripple);
    document.removeEventListener('pointercancel', releaseripple);
    document.removeEventListener('pointercancel', cancelripple);
  }

  incrementRippleCount(el);

  if (computedStyles.position === 'static') {
    if (el.style.position) {originalPositionValue = el.style.position;}
    el.style.position = 'relative';
  }

  rippleContainer.appendChild(rippleEl);
  el.appendChild(rippleContainer);


  document.addEventListener('pointerup', releaseripple);
  document.addEventListener('pointercancel', releaseripple);

  token = setTimeout(() => {
    document.removeEventListener('pointercancel', cancelripple);

    requestAnimationFrame(() => {
      rippleEl.style.transform = `translate(-50%,-50%) scale(1)`;
      rippleEl.style.opacity = `${options.finalOpacity}`;

      setTimeout(() => releaseripple(), options.duration);
    });
  }, options.delay);
  document.addEventListener('pointercancel', cancelripple);
};

export { ripple };
