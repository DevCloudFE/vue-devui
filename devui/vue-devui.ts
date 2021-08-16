import type { App } from 'vue'

import LoadingInstall, { LoadingService, Loading } from './loading'
import ToastInstall, { ToastService } from './toast'

const installs = [
  LoadingInstall,
	ToastInstall
]

export {
  LoadingService,
	Loading,
	ToastService
}

export default {
  version: '0.0.1',
  install(app: App) {
    installs.forEach((p) => app.use(p as any))
  }
}
