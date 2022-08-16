import { IRippleDirectiveOptions, HTMLElementRectType } from '../options';

export const createRippleElement = (
  x: number,
  y: number,
  size: number,
  options: IRippleDirectiveOptions,
  rect: HTMLElementRectType
): HTMLElement => {
  const rippleElement = document.createElement('div');
  rippleElement.style.position = 'absolute';
  rippleElement.style.width = `${size}px`;
  rippleElement.style.height = `${size}px`;
  rippleElement.style.top = options.center ? `${rect.height / 2}px` : `${y}px`;
  rippleElement.style.left = options.center ? `${rect.width / 2}px` : `${x}px`;
  rippleElement.style.background = options.color;
  rippleElement.style.borderRadius = '50%';
  rippleElement.style.opacity = `${options.initialOpacity}`;
  rippleElement.style.transform = `translate(-50%,-50%) scale(0)`;
  rippleElement.style.transition = `transform ${options.duration / 1000}s   cubic-bezier(0.0, 0, 0.2, 1)
  , opacity ${options.duration / 1000}s
  cubic-bezier(0.0, 0, 0.2, 1)
  `;
  return rippleElement;
};
// cubic-bezier(0.0, 0, 0.2, 1)
