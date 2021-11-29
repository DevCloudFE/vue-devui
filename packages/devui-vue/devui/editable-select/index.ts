import type { App } from 'vue'
import EditableSelect from './src/editable-select'

EditableSelect.install = function(app: App): void {
  app.component(EditableSelect.name, EditableSelect)
}

export { EditableSelect }

export default {
  title: 'EditableSelect 可输入下拉选择框',
  category: '数据录入',
  status: '10%', // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
        app.use(EditableSelect as any)
  }
}
