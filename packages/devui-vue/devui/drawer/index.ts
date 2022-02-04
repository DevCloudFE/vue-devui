import type { App } from 'vue'
import Drawer from './src/drawer'
import DrawerService from './src/drawer-service'

Drawer.install = function(app: App): void {
  app.component(Drawer.name, Drawer)
}

export { Drawer, DrawerService }

// TODO: no-service model exists memory leak
// rest tasks
// 1. draggable width 
// 2. function of the 1st icon in header-component 
// 3. rest service-model api 
// 4. typescript type of props
export default {
  title: 'Drawer 抽屉板',
  category: '反馈',
  status: '75%',
  install(app: App): void {
    app.use(Drawer as any)
    app.config.globalProperties.$drawerService = DrawerService
  }
}
