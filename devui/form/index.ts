import type { App } from 'vue'
import Form from './src/form'

Form.install = function(app: App) {
  app.component(Form.name, Form)
}

export { Form }

export default {
  title: 'Form 表单',
  category: '数据录入',
  install(app: App): void {
    app.use(Form as any)
  }
}
