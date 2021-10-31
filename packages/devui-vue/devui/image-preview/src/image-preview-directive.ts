import { BindingTypes } from './image-preview-types'
import ImagePreviewService from './image-preview-service'

function mountedPreviewImages(url: string, urlList: Array<string>): void {
  ImagePreviewService.open({ url, previewUrlList: urlList })
}
function unmountedPreviewImages() {
  ImagePreviewService.close()
}

function getImgByEl(el: HTMLElement): Array<string> {
  const urlList = [...el.querySelectorAll('img')].map((item: HTMLImageElement) =>
    item.getAttribute('src')
  )
  return urlList
}

function handleImgByEl(el: HTMLElement) {
  el.addEventListener('click', (e: MouseEvent) => {
    e.stopPropagation()
    const target = e.target as HTMLElement
    if (target?.nodeName?.toLowerCase() === 'img') {
      const urlList = getImgByEl(el)
      const url = target.getAttribute('src')
      mountedPreviewImages(url, urlList)
    }
  })
}

export default {
  mounted(el: HTMLElement, binding: BindingTypes | undefined) {
    if (!binding.value) {
      return handleImgByEl(el)
    }
    const { custom, disableDefault } = binding.value
    // console.log('指令参数：', custom, disableDefault, zIndex, backDropZIndex)
    if (custom instanceof Object) {
      custom.open = () => {
        const urlList = getImgByEl(el)
        mountedPreviewImages(urlList?.[0], urlList)
      }
      custom.close = () => unmountedPreviewImages()
    }
    if (disableDefault) {
      return
    }
    handleImgByEl(el)
  },
  unmounted() {
    unmountedPreviewImages()
  }
}
