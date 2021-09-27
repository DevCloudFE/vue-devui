const ripple_COUNT = 'vrippleCountInternal'

export function incrementrippleCount(el: HTMLElement) {
  const count = getrippleCount(el)
  setrippleCount(el, count + 1)
}

export function decrementrippleCount(el: HTMLElement) {
  const count = getrippleCount(el)
  setrippleCount(el, count - 1)
}

function setrippleCount(el: HTMLElement, count: number) {
  el.dataset[ripple_COUNT] = count.toString()
}

export function getrippleCount(el: HTMLElement): number {
  return parseInt(el.dataset[ripple_COUNT] ?? '0', 10)
}

export function deleterippleCount(el: HTMLElement) {
  delete el.dataset[ripple_COUNT]
}
