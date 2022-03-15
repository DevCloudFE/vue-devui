import type { App } from 'vue';
import Select from './src/select';

Select.install = function(app: App) {
  app.component(Select.name, Select);
};

export { Select };

export default {
  title: 'Select 下拉框',
  category: '数据录入',
  status: '10%',
  install(app: App): void {
    app.use(Select as any);
  }
};
