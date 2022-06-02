import type { App } from 'vue';
import Collapse from './src/collapse';
import CollapseItem from './src/collapse-item';

export * from './src/collapse-types';

export { Collapse, CollapseItem };

export default {
  title: 'Collapse 折叠面板',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(Collapse.name, Collapse);
    app.component(CollapseItem.name, CollapseItem);
  },
};
