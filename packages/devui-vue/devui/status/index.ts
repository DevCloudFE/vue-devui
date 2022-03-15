import type { App } from 'vue';
import Status from './src/status';

Status.install = function(app: App) {
  app.component(Status.name, Status);
};

export { Status };

export default {
  title: 'Status 状态',
  category: '通用',
  status: '100%',
  install(app: App): void {
    app.use(Status as any);
  }
};
