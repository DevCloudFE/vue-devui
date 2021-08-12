import type { App } from 'vue'
import Anchor from './src/anchor'

Anchor.install = function(app: App) {
  app.component(Anchor.name, Anchor)
}

export { Anchor }

export default {
  title: 'Anchor 锚点',
  category: '导航',
  install(app: App): void {    
		app.use(Anchor as any)
  }
}
