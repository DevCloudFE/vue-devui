import type { App } from 'vue';
import Form from './src/form';
import FormItem from './src/components/form-item/form-item';
import FormOperation from './src/components/form-operation/form-operation';

export { Form, FormItem, FormOperation };

export * from './src/form-types';
export * from './src/components/form-item/form-item-types';

export default {
  title: 'Form 表单',
  category: '数据录入',
  status: '75%',
  install(app: App): void {
    app.component(Form.name, Form);
    app.component(FormItem.name, FormItem);
    app.component(FormOperation.name, FormOperation);
  },
};
