import { createContainer } from './utils/createcontainerelement'
import { createWaveElement } from './utils/createwaveelement'
import { getDistanceToFurthestCorner } from './utils/getdistancetofurthestcorner'
import { getRelativePointer } from './utils/getRelativePointer'
import {
  decrementWaveCount,
  deleteWaveCount,
  getWaveCount,
  incrementWaveCount
} from './utils/wave-count'
import { IVWaveDirectiveOptions } from './options'

const wave = (
  event: PointerEvent,
  el: HTMLElement,
  options: IVWaveDirectiveOptions
) => {
  const rect = el.getBoundingClientRect()
  const computedStyles = window.getComputedStyle(el)

  const { x, y } = getRelativePointer(event, rect)
  const size = 2.05 * getDistanceToFurthestCorner(x, y, rect) // 2.05 is magic, deal with it.

  const waveContainer = createContainer(computedStyles)
  const waveEl = createWaveElement(x, y, size, options)

  incrementWaveCount(el)

  let originalPositionValue = ''
  if (computedStyles.position === 'static') {
    if (el.style.position) originalPositionValue = el.style.position
    el.style.position = 'relative'
  }

  waveContainer.appendChild(waveEl)
  el.appendChild(waveContainer)

  let shouldDissolveWave = false
  const releaseWave = (e?: any) => {
    if (typeof e !== 'undefined') {
      document.removeEventListener('pointerup', releaseWave)
      document.removeEventListener('pointercancel', releaseWave)
    }

    if (shouldDissolveWave) dissolveWave()
    else shouldDissolveWave = true
  }

  const dissolveWave = () => {
    waveEl.style.transition = 'opacity 150ms linear'
    waveEl.style.opacity = '0'

    setTimeout(() => {
      waveContainer.remove()

      decrementWaveCount(el)

      if (getWaveCount(el) === 0) {
        deleteWaveCount(el)
        el.style.position = originalPositionValue
      }
    }, 150)
  }

  document.addEventListener('pointerup', releaseWave)
  document.addEventListener('pointercancel', releaseWave)

  const token = setTimeout(() => {
    document.removeEventListener('pointercancel', cancelWave)

    requestAnimationFrame(() => {
      waveEl.style.transform = `translate(-50%,-50%) scale(1)`
      waveEl.style.opacity = `${options.finalOpacity}`

      setTimeout(() => releaseWave(), options.duration * 1000)
    })
  }, options.cancellationPeriod)

  const cancelWave = () => {
    clearTimeout(token)

    waveContainer.remove()
    document.removeEventListener('pointerup', releaseWave)
    document.removeEventListener('pointercancel', releaseWave)
    document.removeEventListener('pointercancel', cancelWave)
  }

  document.addEventListener('pointercancel', cancelWave)
}

export { wave }
