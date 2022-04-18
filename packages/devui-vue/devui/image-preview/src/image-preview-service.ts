import { createApp } from 'vue';
import { ImagePreviewProps } from './image-preview-types';
import imagePreview from './image-preview';

function createComponent(props: ImagePreviewProps) {
  return createApp(imagePreview, props);
}

class ImagePreviewService {
  static $body: HTMLElement | null = null;
  static $div: HTMLDivElement | null = null;
  // 暂时的禁止滚动穿透,后续应该考虑用modal组件来渲染预览组件
  static $overflow = '';

  static open(props: ImagePreviewProps): void {
    this.$body = document.body;
    this.$div = document.createElement('div');
    this.$overflow = this.$body.style.overflow;
    this.$body.appendChild(this.$div);
    createComponent(props).mount(this.$div);

    this.$body.style.setProperty('overflow', 'hidden', 'important');
  }
  static close(): void {
    this.$body?.style.setProperty('overflow', this.$overflow);
    this.$overflow = null;

    this.$div && this.$body.removeChild(this.$div);
    this.$body = null;
    this.$div = null;
  }
}

export default ImagePreviewService;
