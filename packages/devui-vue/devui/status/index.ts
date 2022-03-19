import type { App } from 'vue';
import Status from './src/status';

export * from './src/status-types';

export { Status };

export default {
  title: 'Status 状态',
  category: '通用',
  status: '100%',
  install(app: App): void {
    app.component(Status.name, Status);
  }
};
