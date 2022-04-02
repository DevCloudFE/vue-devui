import type { App } from 'vue';
import EditableSelect from './src/editable-select';

export * from './src/editable-select-types';

export { EditableSelect };

export default {
  title: 'EditableSelect 可输入下拉选择框',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.component(EditableSelect.name, EditableSelect);
  }
};
