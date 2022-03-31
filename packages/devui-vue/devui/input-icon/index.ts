import type { App } from 'vue';
import InputIcon from './src/input-icon';

export { InputIcon };

export default {
  title: 'InputIcon输入框',
  category: '数据录入',
  status: '75%',
  install(app: App): void {
    app.component(InputIcon.name, InputIcon);
  }
};
