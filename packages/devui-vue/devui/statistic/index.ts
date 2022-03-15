import type { App } from 'vue';
import Statistic from './src/statistic';

Statistic.install = function(app: App): void {
  app.component(Statistic.name, Statistic);
};

export { Statistic };

export default {
  title: 'Statistic 统计数值',
  category: '数据展示',
  status: '100%', // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    app.use(Statistic as any);
  }
};
