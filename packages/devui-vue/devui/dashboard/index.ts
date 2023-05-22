import type { App } from 'vue';
import Dashboard from './src/dashboard';
import DashboardWidget from './src/components/dashboard-widget/dashboard-widget';

export * from './src/dashboard-types';

export * from './src/components/dashboard-widget/dashboard-widget-types';

export { Dashboard };

export default {
  title: 'Dashboard 仪表盘',
  category: '数据展示',
  status: '10%',
  install(app: App) {
    app.component(Dashboard.name, Dashboard);
    app.component(DashboardWidget.name, DashboardWidget);
  },
};
