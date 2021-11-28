import type { App } from 'vue'
import TimeAxis from './src/time-axis'
import TimeAxisItem from './src/components/time-axis-item'

TimeAxis.install = function (app: App): void {
  app.component(TimeAxis.name, TimeAxis)
}
TimeAxisItem.install = function (app: App): void {
  app.component(TimeAxisItem.name, TimeAxisItem)
}
export { TimeAxis, TimeAxisItem }

export default {
  title: 'TimeAxis 时间轴',
  category: '数据展示',
  status: '已完成',
  install(app: App): void {
    app.use(TimeAxis as any)
    app.use(TimeAxisItem as any)
  }
}
