import type { App } from 'vue';
import Switch from './src/switch';

Switch.install = function(app: App) {
  app.component(Switch.name, Switch);
};

export { Switch };

export default {
  title: 'Switch 开关',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.use(Switch as any);
  }
};
