import { IVWaveDirectiveOptions } from '../options'

export const createWaveElement = (
  x: number,
  y: number,
  size: number,
  options: IVWaveDirectiveOptions
): HTMLElement => {
  const waveElement = document.createElement('div')

  waveElement.style.position = 'absolute'
  waveElement.style.width = `${size}px`
  waveElement.style.height = `${size}px`
  waveElement.style.top = `${y}px`
  waveElement.style.left = `${x}px`
  waveElement.style.background = options.color
  waveElement.style.borderRadius = '50%'
  waveElement.style.opacity = `${options.initialOpacity}`
  waveElement.style.transform = `translate(-50%,-50%) scale(0)`
  waveElement.style.transition = `transform ${options.duration}s ${options.easing}, opacity ${options.duration}s ${options.easing}`

  return waveElement
}
