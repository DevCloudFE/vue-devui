import type { App } from 'vue'
import TimePicker from './src/time-picker'

TimePicker.install = function(app: App): void {
  app.component(TimePicker.name, TimePicker)
}

export { TimePicker }

export default {
  title: 'TimePicker 时间选择器',
  category: '数据录入',
  status: '20%',
  install(app: App): void {
    app.use(TimePicker as any)
  }
}
