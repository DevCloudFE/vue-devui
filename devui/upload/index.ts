import type { App } from 'vue'
import Upload from './src/single-upload'
import fileDropDirective from './src/file-drop-directive'

Upload.install = function (app: App) {
  app.directive('file-drop', fileDropDirective)
  app.component(Upload.name, Upload)
}

export { Upload }

export default {
  title: 'Upload Upload 上传',
  category: '数据录入',
  install(app: App): void {
    app.use(Upload as any)
  },
}
