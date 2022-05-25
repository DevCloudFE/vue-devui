import type { App } from 'vue';
import Checkbox from './src/checkbox';
import CheckboxGroup from './src/checkbox-group';
import CheckboxButton from './src/checkbox-button';

export * from './src/checkbox-types';

export { Checkbox, CheckboxGroup, CheckboxButton };

export default {
  title: 'Checkbox 复选框',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.component(Checkbox.name, Checkbox);
    app.component(CheckboxGroup.name, CheckboxGroup);
    app.component(CheckboxButton.name, CheckboxButton);
  },
};
