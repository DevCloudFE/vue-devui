import type { App } from 'vue';
import Alert from './src/alert';

Alert.install = function (app: App) {
  app.component(Alert.name, Alert);
};

export { Alert };

export default {
  title: 'Alert 警告',
  category: '反馈',
  status: '100%',
  install(app: App): void {
    app.use(Alert as any);
  },
};
