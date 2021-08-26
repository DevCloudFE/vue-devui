import type { App } from 'vue'
import Toast from './src/toast'
import ToastService from './src/toast-service'

Toast.install = function(app: App) {
  app.component(Toast.name, Toast)
}

export { Toast, ToastService }

export default {
  title: 'Toast 全局提示',
  category: '反馈',
  install(app: App): void {
    app.use(Toast as any)
    app.config.globalProperties.$toastService = ToastService
  }
}
