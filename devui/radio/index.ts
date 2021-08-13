import type { App } from 'vue'
import Radio from './src/radio'

Radio.install = function(app: App) {
  app.component(Radio.name, Radio)
}

export { Radio }

export default {
  title: 'Radio 单选框',
  category: '数据录入',
  install(app: App): void {
    app.use(Radio as any)
  }
}
