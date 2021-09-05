import type { App } from 'vue'
import Popover from './src/popover'
import PopoverDirective from './src/directive'

Popover.install = function (app: App): void {
  app.component(Popover.name, Popover)
}

export { Popover, PopoverDirective }

export default {
  title: 'Popover 悬浮提示',
  category: '反馈',
  status: '开发中', // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    app.use(Popover as any)
    app.directive('dPopover', PopoverDirective)
  }
}
