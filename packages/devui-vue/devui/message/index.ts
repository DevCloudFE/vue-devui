import type { App } from 'vue';
import Message from './src/message-service';

export * from './src/message-types';

export { Message };

export default {
  title: 'Message 全局提示',
  category: '反馈',
  status: '100%',
  install(app: App): void {
    app.config.globalProperties.$message = Message;
  },
};
