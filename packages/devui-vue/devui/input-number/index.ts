import type { App } from 'vue';
import InputNumber from './src/input-number';

InputNumber.install = function(app: App) {
  app.component(InputNumber.name, InputNumber);
};

export { InputNumber };

export default {
  title: 'InputNumber 数字输入框',
  category: '数据录入',
  status: '50%',
  install(app: App): void {
    app.use(InputNumber as any);
  }
};
