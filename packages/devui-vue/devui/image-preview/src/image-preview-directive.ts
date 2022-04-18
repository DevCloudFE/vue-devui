import { BindingTypes, ImagePreviewProps, UpdateBindingTypes } from './image-preview-types';
import ImagePreviewService from './image-preview-service';

interface PreviewHTMLElement extends HTMLElement {
  zIndex?: number;
  backDropZIndex?: number;
}

function mountedPreviewImages(props: ImagePreviewProps): void {
  ImagePreviewService.open({
    url: props.url,
    previewUrlList: props.previewUrlList,
    zIndex: props.zIndex,
    backDropZIndex: props.backDropZIndex,
  });
}
function unmountedPreviewImages() {
  ImagePreviewService.close();
}

function getImgByEl(el: HTMLElement): Array<string> {
  const urlList = [...el.querySelectorAll('img')].map((item: HTMLImageElement) => item.getAttribute('src'));
  return urlList;
}
function handleImg(e: MouseEvent) {
  e.stopPropagation();
  const el = e.currentTarget as PreviewHTMLElement;
  const target = e.target as PreviewHTMLElement;
  if (target?.nodeName?.toLowerCase() === 'img') {
    const urlList = getImgByEl(el);
    const url = target.getAttribute('src');
    mountedPreviewImages({
      url,
      previewUrlList: urlList,
      zIndex: el?.zIndex,
      backDropZIndex: el?.backDropZIndex,
    });
  }
}
function handleImgByEl(el: PreviewHTMLElement) {
  el.addEventListener('click', handleImg);
}
function removeHandle(el: PreviewHTMLElement) {
  el.removeEventListener('click', handleImg);
}
export default {
  mounted(el: PreviewHTMLElement, binding: BindingTypes | undefined): void {
    if (!binding.value) {
      return handleImgByEl(el);
    }
    const { custom, disableDefault } = binding.value;
    if (custom instanceof Object) {
      custom.open = () => {
        const urlList = getImgByEl(el);
        mountedPreviewImages({
          url: urlList?.[0],
          previewUrlList: urlList,
          zIndex: el?.zIndex,
          backDropZIndex: el?.backDropZIndex,
        });
      };
      custom.close = () => unmountedPreviewImages();
    }
    if (disableDefault) {
      return;
    }
    handleImgByEl(el);
  },
  unmounted(): void {
    unmountedPreviewImages();
  },
  updated(el: PreviewHTMLElement, binding: UpdateBindingTypes | undefined): void {
    el.zIndex = binding.value?.zIndex;
    el.backDropZIndex = binding.value?.backDropZIndex;

    if (binding.value) {
      const {
        value: { disableDefault },
        oldValue: { disableDefault: oldDisableDefault },
      } = binding;
      if (disableDefault !== oldDisableDefault) {
        if (disableDefault) {
          removeHandle(el);
        } else {
          handleImgByEl(el);
        }
      }
    }
  },
};
