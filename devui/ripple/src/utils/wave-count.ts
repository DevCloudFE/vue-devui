const WAVE_COUNT = 'vWaveCountInternal'

export function incrementWaveCount(el: HTMLElement) {
  const count = getWaveCount(el)
  setWaveCount(el, count + 1)
}

export function decrementWaveCount(el: HTMLElement) {
  const count = getWaveCount(el)
  setWaveCount(el, count - 1)
}

function setWaveCount(el: HTMLElement, count: number) {
  el.dataset[WAVE_COUNT] = count.toString()
}

export function getWaveCount(el: HTMLElement) {
  return parseInt(el.dataset[WAVE_COUNT] ?? '0', 10)
}

export function deleteWaveCount(el: HTMLElement) {
  delete el.dataset[WAVE_COUNT]
}
