import type { App } from 'vue';
import Input from './src/input';

export * from './src/input-types';

export { Input };

export default {
  title: 'Input 输入框',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.component(Input.name, Input);
  }
};
