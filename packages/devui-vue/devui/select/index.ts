import type { App } from 'vue';
import Select from './src/select';

export { Select };

export default {
  title: 'Select 下拉框',
  category: '数据录入',
  status: '10%',
  install(app: App): void {
    app.component(Select.name, Select);
  },
};
