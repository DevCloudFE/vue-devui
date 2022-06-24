import type { App } from 'vue';
import Tree from './src/tree';

export * from './src/tree-types';
export * from './src/composables/use-tree-types';

export { Tree };

export default {
  title: 'Tree 树',
  category: '数据展示',
  status: '50%',
  install(app: App): void {
    app.component(Tree.name, Tree);
  }
};
