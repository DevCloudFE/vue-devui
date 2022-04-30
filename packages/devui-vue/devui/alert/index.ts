import type { App } from 'vue';
import Alert from './src/alert';

export * from './src/alert-types';

export { Alert };

export default {
  title: 'Alert 警告',
  category: '反馈',
  status: '100%',
  install(app: App): void {
    app.component(Alert.name, Alert);
  },
};
