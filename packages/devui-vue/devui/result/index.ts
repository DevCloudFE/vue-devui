import type { App } from 'vue';
import Result from './src/result';

Result.install = function(app: App): void {
  app.component(Result.name, Result);
};

export { Result };

export default {
  title: 'Result 结果',
  category: '反馈',
  status: '100%',
  install(app: App): void {
    app.use(Result as any);
  }
};
