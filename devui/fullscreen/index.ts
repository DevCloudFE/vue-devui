import type { App } from 'vue'
import Fullscreen from './src/fullscreen'

Fullscreen.install = function(app: App): void {
  app.component(Fullscreen.name, Fullscreen)
}

export { Fullscreen }

export default {
  title: 'Fullscreen 全屏',
  category: '通用',
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    
    app.use(Fullscreen as any)
  }
}
