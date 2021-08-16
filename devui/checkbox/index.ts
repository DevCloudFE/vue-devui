import type { App } from 'vue'
import Checkbox from './src/checkbox'

Checkbox.install = function(app: App) {
  app.component(Checkbox.name, Checkbox)
}

export { Checkbox }

export default {
  title: 'Checkbox 复选框',
  category: '数据录入',
  install(app: App): void {
    app.use(Checkbox as any)
  }
}
