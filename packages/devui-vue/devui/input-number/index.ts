import type { App } from 'vue';
import InputNumber from './src/input-number';

export { InputNumber };

export default {
  title: 'InputNumber 数字输入框',
  category: '数据录入',
  status: '50%',
  install(app: App): void {
    app.component(InputNumber.name, InputNumber);
  }
};
