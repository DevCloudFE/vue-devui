import type { App } from 'vue';
import DChart from './src/echarts';
export * from './src/echarts-types';

export { DChart };

export default {
  title: 'Echarts 图表',
  category: '演进中',
  status: '100%',
  install(app: App): void {
    app.component(DChart.name, DChart);
  },
};
