export const createContainer = ({
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius
}: CSSStyleDeclaration) => {
  const waveContainer = document.createElement('div')
  waveContainer.style.top = '0'
  waveContainer.style.left = '0'
  waveContainer.style.width = '100%'
  waveContainer.style.height = '100%'
  waveContainer.style.position = 'absolute'
  waveContainer.style.borderRadius = `${borderTopLeftRadius} ${borderTopRightRadius} ${borderBottomRightRadius} ${borderBottomLeftRadius}`
  waveContainer.style.overflow = 'hidden'
  waveContainer.style.pointerEvents = 'none'

  // 兼容 ie  苹果
  waveContainer.style.webkitMaskImage = '-webkit-radial-gradient(white, black)'

  return waveContainer
}
