import { App } from 'vue'
import dLoading from './src/directive'
import LoadingService from './src/service'

export default {
  install(app: App) {
    app.directive('dLoading', dLoading)
  },
  LoadingService,
  dLoading
}
