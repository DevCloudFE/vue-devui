import type { App } from 'vue'
import Cascader from './src/cascader'

Cascader.install = function(app: App): void {
  app.component(Cascader.name, Cascader)
}

export { Cascader }

export default {
  title: 'Cascader 级联菜单',
  category: '数据录入',
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    
    app.use(Cascader as any)
  }
}
