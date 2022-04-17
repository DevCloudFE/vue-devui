import type { App } from 'vue';
import Notification from './src/notification';
import NotificationService from './src/notification-service';
export * from './src/notification-types';

export { Notification, NotificationService };

export default {
  title: 'Notification 全局通知',
  category: '反馈',
  status: '100%',
  install(app: App): void {
    app.component(Notification.name, Notification);
    app.config.globalProperties.$notificationService = NotificationService;
  },
};
