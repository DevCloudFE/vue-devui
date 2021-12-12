import type { App } from 'vue'
import Button from './src/button'
import { Loading } from '../loading/index'

Button.install = function (app: App) {
  app.directive('dLoading', Loading)
  app.component(Button.name, Button)
}

export * from './src/button-types'

export { Button }

export default {
  title: 'Button 按钮',
  category: '通用',
  status: '100%',
  install(app: App): void {
    app.use(Button as any)
  }
}
