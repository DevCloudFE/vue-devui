import type { App } from 'vue';
import Tabs from './src/tabs';
import Tab from './src/components/tab/tab';

export * from './src/tabs-types';

export { Tabs, Tab };

export default {
  title: 'Tabs 选项卡',
  category: '导航',
  status: '60%',
  install(app: App): void {
    app.component(Tabs.name, Tabs);
    app.component(Tab.name, Tab);
  },
};
