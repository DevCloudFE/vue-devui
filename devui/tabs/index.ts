import { App } from 'vue';
// import type { App } from 'vue';
import Tabs from './src/tabs';
import Tab from './src/tab';

Tabs.install = function (app: App) {
  app.component(Tabs.name, Tabs);
  app.component(Tab.name, Tab);
};

export { Tabs };

export default {
  title: 'Tabs 选项卡',
  category: '导航',
  status: '60%',
  install(app: App): void {
    app.use(Tabs as any);
  }
};
