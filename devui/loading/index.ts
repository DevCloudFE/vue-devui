import { App } from 'vue'
import Loading from './src/directive'
import LoadingService from './src/service'

export default {
  install(app: App): void {
    app.directive('dLoading', Loading)
    app.config.globalProperties.$loadingService = LoadingService
  }
}

export {
  LoadingService,
  Loading
}
