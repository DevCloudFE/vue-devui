import type { App } from 'vue'
import Tab from './src/tab'

Tab.install = function(app: App) {
  app.component(Tab.name, Tab)
}

export { Tab }

export default {
  title: 'Tab 选项卡',
  category: '导航',
  install(app: App): void {    
		app.use(Tab as any)
  }
}
