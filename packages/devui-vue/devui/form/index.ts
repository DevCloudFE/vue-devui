import type { App } from 'vue';
import Form from './src/form';
import FormLabel from './src/components/form-label/form-label';
import FormItem from './src/components/form-item/form-item';
import FormControl from './src/components/form-control/form-control';
import FormOperation from './src/components/form-operation/form-operation';
import dValidateRules from './src/components/directive/d-validate-rules';

export { Form, FormLabel, FormItem, FormControl, FormOperation };

export default {
  title: 'Form 表单',
  category: '数据录入',
  status: '75%',
  install(app: App): void {
    app.component(Form.name, Form);
    app.directive('d-validate-rules', dValidateRules);
    app.component(FormLabel.name, FormLabel);
    app.component(FormItem.name, FormItem);
    app.component(FormControl.name, FormControl);
    app.component(FormOperation.name, FormOperation);
  },
};
