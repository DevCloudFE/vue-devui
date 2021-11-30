import type { App } from 'vue'
import Popover from './src/popover'

Popover.install = function (app: App): void {
  app.component(Popover.name, Popover)
}

export { Popover }

export default {
  title: 'Popover 悬浮提示',
  category: '反馈',
  status: '100%',
  install(app: App): void {
    app.use(Popover as any);
  }
}
