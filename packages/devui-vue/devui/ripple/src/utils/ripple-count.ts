const RIPPLE_COUNT = 'vRippleCountInternal';

export function incrementRippleCount(el: HTMLElement) {
  const count = getRippleCount(el);
  setRippleCount(el, count + 1);
}

export function decrementRippleCount(el: HTMLElement) {
  const count = getRippleCount(el);
  setRippleCount(el, count - 1);
}

function setRippleCount(el: HTMLElement, count: number) {
  el.dataset[RIPPLE_COUNT] = count.toString();
}

export function getRippleCount(el: HTMLElement): number {
  return parseInt(el.dataset[RIPPLE_COUNT] ?? '0', 10);
}

export function deleteRippleCount(el: HTMLElement) {
  delete el.dataset[RIPPLE_COUNT];
}
