import type { App } from 'vue';
import Progress from './src/progress';

Progress.install = function(app: App) {
  app.component(Progress.name, Progress);
};

export { Progress };

export default {
  title: 'Progress 进度条',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.use(Progress as any);
  }
};
