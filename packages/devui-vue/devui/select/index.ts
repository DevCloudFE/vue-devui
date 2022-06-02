import type { App } from 'vue';
import Select from './src/select';
import Option from './src/components/option';

export { Select, Option };

export default {
  title: 'Select 下拉框',
  category: '数据录入',
  status: '90%',
  install(app: App): void {
    app.component(Select.name, Select);
    app.component(Option.name, Option);
  },
};
