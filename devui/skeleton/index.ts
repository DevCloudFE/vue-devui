import type { App } from 'vue'
import Skeleton from './src/skeleton'

Skeleton.install = function(app: App): void {
  app.component(Skeleton.name, Skeleton)
}

export { Skeleton }

export default {
  title: 'Skeleton 骨架屏',
  category: '数据展示',
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    
    app.use(Skeleton as any)
  }
}
