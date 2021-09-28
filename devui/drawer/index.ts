import type { App } from 'vue'
import Drawer from './src/drawer'

Drawer.install = function(app: App): void {
  app.component(Drawer.name, Drawer)
}

export { Drawer }

export default {
  title: 'Drawer 抽屉板',
  category: '反馈',
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    
    app.use(Drawer as any)
  }
}
