import { App } from 'vue'
import dLoading from './src/directive'
import LoadingService from './src/service'

export default {
  install(app: App) {
    app.directive('dLoading', dLoading)
    app.config.globalProperties.$loadingService = LoadingService
  }
}

export {
  LoadingService,
  dLoading
}
