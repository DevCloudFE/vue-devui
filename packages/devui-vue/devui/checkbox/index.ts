import type { App } from 'vue';
import Checkbox from './src/checkbox';
import CheckboxGroup from './src/checkbox-group';

Checkbox.install = function (app: App) {
  app.component(Checkbox.name, Checkbox);
};

CheckboxGroup.install = function (app: App) {
  app.component(CheckboxGroup.name, CheckboxGroup);
};

export { Checkbox };

export default {
  title: 'Checkbox 复选框',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.use(Checkbox as any);
    app.use(CheckboxGroup as any);
  }
};
