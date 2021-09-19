import type { App } from 'vue'
import Sticky from './src/sticky'

Sticky.install = function(app: App): void {
  app.component(Sticky.name, Sticky)
}

export { Sticky }

export default {
  title: 'Sticky 便贴',
  category: '通用',
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    
    app.use(Sticky as any)
  }
}
