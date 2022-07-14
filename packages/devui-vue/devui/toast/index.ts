import type { App } from 'vue';
import ToastComponent from './src/toast';
import Toast from './src/service';

export * from './src/toast-types';

export { Toast, ToastComponent };

export default {
  title: 'Toast 全局通知',
  category: '反馈',
  status: '100%',
  install(app: App): void {
    app.component(ToastComponent.name, ToastComponent);
    app.config.globalProperties.$toast = Toast;
  },
};
