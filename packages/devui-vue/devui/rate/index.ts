import type { App } from 'vue';
import Rate from './src/rate';

export * from './src/rate-types';

export { Rate };

export default {
  title: 'Rate 评分',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(Rate.name, Rate);
  },
};
