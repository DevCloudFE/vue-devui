import type { App } from 'vue';
import Input from './src/input';

Input.install = function(app: App) {
  app.component(Input.name, Input);
};

export { Input };

export default {
  title: 'Input 输入框',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.use(Input as any);
  }
};
