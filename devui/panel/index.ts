import type { App } from 'vue'
import Panel from './src/panel'

Panel.install = function(app: App) {
  app.component(Panel.name, Panel)
}

export { Panel }

export default {
  title: 'Panel 面板',
  category: '通用',
  install(app: App): void {    
		app.use(Panel as any)
  }
}
