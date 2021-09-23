import type { App } from 'vue'
import Table from './src/table'

Table.install = function(app: App): void {
  app.component(Table.name, Table)
}

export { Table }

export default {
  title: 'Table 表格',
  category: '数据展示',
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    
    app.use(Table as any)
  }
}
