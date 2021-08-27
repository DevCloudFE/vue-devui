import type { App } from 'vue'
import ImagePreviewDirective from './src/image-preview-directive'
import ImagePreviewService from './src/image-preview-service'

export { ImagePreviewDirective, ImagePreviewService }

export default {
  title: 'ImagePreview 图片预览',
  category: '数据展示',
  install(app: App): void {
    app.directive('ImagePreview', ImagePreviewDirective)
    app.config.globalProperties.$imagePreviewService = ImagePreviewService
  }
}
