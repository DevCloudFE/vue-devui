import type { App } from 'vue';
import Statistic from './src/statistic';

export * from './src/statistic-types';

export { Statistic };

export default {
  title: 'Statistic 统计数值',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(Statistic.name, Statistic);
  }
};
