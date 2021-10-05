import type { App } from 'vue'
import Tree from './src/tree'

Tree.install = function(app: App): void {
  app.component(Tree.name, Tree)
}

export { Tree }

export default {
  title: 'Tree 树',
  category: '数据展示',
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    
    app.use(Tree as any)
  }
}
