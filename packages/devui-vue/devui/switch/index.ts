import type { App } from 'vue';
import Switch from './src/switch';

export * from './src/switch-types';

export { Switch };

export default {
  title: 'Switch 开关',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.component(Switch.name, Switch);
  }
};
