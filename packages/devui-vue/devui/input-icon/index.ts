import type { App } from 'vue';
import InputIcon from './src/input-icon';

InputIcon.install = function(app: App) {
  app.component(InputIcon.name, InputIcon);
};

export { InputIcon };

export default {
  title: 'InputIcon输入框',
  category: '数据录入',
  status: '75%',
  install(app: App): void {
    app.use(InputIcon as any);
  }
};
