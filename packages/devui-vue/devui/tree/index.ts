import type { App } from 'vue';
import Tree from './src/tree';
import NewTree from './src/new-tree';

export * from './src/tree-types';

export { Tree, NewTree };

export default {
  title: 'Tree 树',
  category: '数据展示',
  status: '20%',
  install(app: App): void {
    app.component(Tree.name, Tree);
    app.component(NewTree.name, NewTree);
  }
};
