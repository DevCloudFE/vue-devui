import type { App } from 'vue'
import ReadTip from './src/read-tip'
import ReadTipDirective from './src/read-tip-directive'

ReadTip.install = function(app: App): void {
  app.component(ReadTip.name, ReadTip)
}

export { ReadTip, ReadTipDirective }

export default {
  title: 'ReadTip 阅读提示',
  category: '反馈',
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
        app.use(ReadTip as any)
    app.directive('ReadTip', ReadTipDirective)
  }
}
