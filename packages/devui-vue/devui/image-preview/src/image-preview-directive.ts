import { BindingTypes, ImagePreviewProps } from './image-preview-types'
import ImagePreviewService from './image-preview-service'

interface PreviewHTMLElement extends HTMLElement {
  zIndex?: number
  backDropZIndex?: number
}

function mountedPreviewImages(props: ImagePreviewProps): void {
  ImagePreviewService.open({
    url: props.url,
    previewUrlList: props.previewUrlList,
    zIndex: props.zIndex,
    backDropZIndex: props.backDropZIndex
  })
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

function handleImgByEl(el: PreviewHTMLElement) {
  el.addEventListener('click', (e: MouseEvent) => {
    e.stopPropagation()
    const target = e.target as PreviewHTMLElement
    if (target?.nodeName?.toLowerCase() === 'img') {
      const urlList = getImgByEl(el)
      const url = target.getAttribute('src')
      mountedPreviewImages({
        url,
        previewUrlList: urlList,
        zIndex: el?.zIndex,
        backDropZIndex: el?.backDropZIndex
      })
    }
  })
}

export default {
  mounted(el: PreviewHTMLElement, binding: BindingTypes | undefined) {
    if (!binding.value) {
      return handleImgByEl(el)
    }
    const { custom, disableDefault } = binding.value
    // console.log('指令参数：', custom, disableDefault, zIndex, backDropZIndex)
    if (custom instanceof Object) {
      custom.open = () => {
        const urlList = getImgByEl(el)
        mountedPreviewImages({
          url: urlList?.[0],
          previewUrlList: urlList,
          zIndex: el?.zIndex,
          backDropZIndex: el?.backDropZIndex
        })
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
  },
  updated(el: PreviewHTMLElement, binding) {
    el.zIndex = binding.value?.zIndex
    el.backDropZIndex = binding.value?.backDropZIndex
  }
}
