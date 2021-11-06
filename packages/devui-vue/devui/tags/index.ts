import type { App } from 'vue'
import Tags from './src/tags'

Tags.install = function(app: App): void {
  app.component(Tags.name, Tags)
}

export { Tags }

export default {
  title: 'Tags 标签',
  category: '数据展示',
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
        app.use(Tags as any)
  }
}
