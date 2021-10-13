import type { App } from 'vue'
import Gantt from './src/gantt'

Gantt.install = function(app: App): void {
  app.component(Gantt.name, Gantt)
}

export { Gantt }

export default {
  title: 'Gantt 甘特图',
  category: '数据展示',
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
        app.use(Gantt as any)
  }
}
