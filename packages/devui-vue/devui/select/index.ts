import type { App } from 'vue';
import Select from './src/select';
import Option from './src/components/option';
import OptionGroup from './src/components/option-group';

export { Select, Option, OptionGroup };

export default {
  title: 'Select 下拉框',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.component(Select.name, Select);
    app.component(Option.name, Option);
    app.component(OptionGroup.name, OptionGroup);
  },
};
