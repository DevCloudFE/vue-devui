import type { App } from 'vue';
import Form from './src/form';
import FormLabel from './src/form-label/form-label';
import FormItem from './src/form-item/form-item';
import FormControl from './src/form-control/form-control';
import FormOperation from './src/form-operation/form-operation';
import dValidateRules from './src/directive/d-validate-rules';

Form.install = function(app: App) {
  app.component(Form.name, Form);
  app.directive('d-validate-rules', dValidateRules);
};

FormLabel.install = function(app: App) {
  app.component(FormLabel.name, FormLabel);
};

FormItem.install = function(app: App) {
  app.component(FormItem.name, FormItem);
};

FormControl.install = function(app: App) {
  app.component(FormControl.name, FormControl);
};

FormOperation.install = function(app: App) {
  app.component(FormOperation.name, FormOperation);
};

export { Form, FormLabel, FormItem, FormControl, FormOperation };

export default {
  title: 'Form 表单',
  category: '数据录入',
  status: '75%',
  install(app: App): void {
    app.use(Form as any);
    app.use(FormLabel as any);
    app.use(FormItem as any);
    app.use(FormControl as any);
    app.use(FormOperation as any);
  }
};
