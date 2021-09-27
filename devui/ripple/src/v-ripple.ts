import { createContainer } from './utils/create-container-element'
import { createrippleElement } from './utils/create-ripple-element'
import { getDistanceToFurthestCorner } from './utils/getdistance-tofurthestcorner'
import { getRelativePointer } from './utils/getrelative-pointer'
import {
  decrementrippleCount,
  deleterippleCount,
  getrippleCount,
  incrementrippleCount
} from './utils/ripple-count'
import { IVrippleDirectiveOptions } from './options'

const ripple = (
  event: PointerEvent,
  el: HTMLElement,
  options: IVrippleDirectiveOptions
) => {
  const rect = el.getBoundingClientRect()
  const computedStyles = window.getComputedStyle(el)

  const { x, y } = getRelativePointer(event, rect)
  const size = 2.05 * getDistanceToFurthestCorner(x, y, rect) // 2.05 is magic, deal with it.

  const rippleContainer = createContainer(computedStyles)
  const rippleEl = createrippleElement(x, y, size, options)

  incrementrippleCount(el)

  let originalPositionValue = ''
  if (computedStyles.position === 'static') {
    if (el.style.position) originalPositionValue = el.style.position
    el.style.position = 'relative'
  }

  rippleContainer.appendChild(rippleEl)
  el.appendChild(rippleContainer)

  let shouldDissolveripple = false
  const releaseripple = (e?: any) => {
    if (typeof e !== 'undefined') {
      document.removeEventListener('pointerup', releaseripple)
      document.removeEventListener('pointercancel', releaseripple)
    }

    if (shouldDissolveripple) dissolveripple()
    else shouldDissolveripple = true
  }

  const dissolveripple = () => {
    rippleEl.style.transition = 'opacity 150ms linear'
    rippleEl.style.opacity = '0'

    setTimeout(() => {
      rippleContainer.remove()

      decrementrippleCount(el)

      if (getrippleCount(el) === 0) {
        deleterippleCount(el)
        el.style.position = originalPositionValue
      }
    }, 150)
  }

  document.addEventListener('pointerup', releaseripple)
  document.addEventListener('pointercancel', releaseripple)

  const token = setTimeout(() => {
    document.removeEventListener('pointercancel', cancelripple)

    requestAnimationFrame(() => {
      rippleEl.style.transform = `translate(-50%,-50%) scale(1)`
      rippleEl.style.opacity = `${options.finalOpacity}`

      setTimeout(() => releaseripple(), options.duration * 1000)
    })
  }, options.cancellationPeriod)

  const cancelripple = () => {
    clearTimeout(token)

    rippleContainer.remove()
    document.removeEventListener('pointerup', releaseripple)
    document.removeEventListener('pointercancel', releaseripple)
    document.removeEventListener('pointercancel', cancelripple)
  }

  document.addEventListener('pointercancel', cancelripple)
}

export { ripple }
