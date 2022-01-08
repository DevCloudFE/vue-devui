import type { App } from 'vue'
import Drawer from './src/drawer'
import DrawerService from './src/drawer-service'

Drawer.install = function(app: App): void {
  app.component(Drawer.name, Drawer)
}

export { Drawer, DrawerService }

export default {
  title: 'Drawer 抽屉板',
  category: '反馈',
  status: '60%',
  install(app: App): void {
    app.use(Drawer as any)
    app.config.globalProperties.$drawerService = DrawerService
  }
}
