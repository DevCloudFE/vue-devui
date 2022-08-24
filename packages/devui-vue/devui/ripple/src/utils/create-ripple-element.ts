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
  rippleElement.style.width = options.center ? `${Math.sqrt(rect.width * rect.width + rect.height * rect.height)}px` : `${size * 2}px`;
  // rippleElement.style.height = options.center ? `${size}px` : `${size}px`;
  rippleElement.style.height = options.center ? `${Math.sqrt(rect.width * rect.width + rect.height * rect.height)}px` : `${size * 2}px`;
  rippleElement.style.top = options.center ? `${rect.height / 2}px` : `${y}px`;
  rippleElement.style.left = options.center ? `${rect.width / 2}px` : `${x}px`;

  rippleElement.style.background = options.color;
  rippleElement.style.borderRadius = '50%';
  rippleElement.style.opacity = `${options.initialOpacity}`;
  rippleElement.style.transform = `translate(-50%,-50%) scale(0)`;
  rippleElement.style.transition = `transform ${options.duration / 1000}s   cubic-bezier(0, 0.5, 0.25, 1)
  , opacity ${options.duration / 1000}s
  cubic-bezier(0.0, 0, 0.2, 1)
  `;
  return rippleElement;
};

// Standard cubic-bezier
// cubic-bezier(0.0, 0, 0.2, 1)
