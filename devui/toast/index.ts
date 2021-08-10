import type { App } from 'vue'
import Toast from './src/toast'
import ToastService from './src/toast-service'

Toast.install = function (app: App) {
  app.component(Toast.name, Toast)
  app.config.globalProperties.$toastService = ToastService
}

export { ToastService }

export default Toast
