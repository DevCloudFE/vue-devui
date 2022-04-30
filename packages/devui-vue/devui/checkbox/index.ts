import type { App } from 'vue';
import Checkbox from './src/checkbox';
import CheckboxGroup from './src/checkbox-group';

export * from './src/checkbox-types';

export { Checkbox, CheckboxGroup };

export default {
  title: 'Checkbox 复选框',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.component(Checkbox.name, Checkbox);
    app.component(CheckboxGroup.name, CheckboxGroup);
  },
};
