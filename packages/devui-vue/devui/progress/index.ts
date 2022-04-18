import type { App } from 'vue';
import Progress from './src/progress';

export * from './src/progress-types';

export { Progress };

export default {
  title: 'Progress 进度条',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(Progress.name, Progress);
  }
};
