import type { App } from 'vue';
import Rate from './src/rate';

Rate.install = function (app: App) {
  app.component(Rate.name, Rate);
};

export { Rate };

export default {
  title: 'Rate 评分',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.use(Rate as any);
  },
};
