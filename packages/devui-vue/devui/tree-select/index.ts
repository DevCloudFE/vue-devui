import type { App } from 'vue';
import TreeSelect from './src/tree-select';

TreeSelect.install = function(app: App): void {
  app.component(TreeSelect.name, TreeSelect);
};

export { TreeSelect };

export default {
  title: 'TreeSelect 树形选择框',
  category: '数据录入',
  status: '20%', // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    app.use(TreeSelect as any);
  }
};
