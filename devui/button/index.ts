import type { App } from 'vue'
import Button from './src/button'

Button.install = function (app: App) {
  app.component(Button.name, Button)
}

export * from './src/button-types';

export { Button }

export default {
  title: 'Button 按钮',
  category: '通用',
  install(app: App): void {
    app.use(Button as any)
  }
}
