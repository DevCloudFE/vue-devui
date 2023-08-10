import type { App } from 'vue';
import GitGraph from './src/git-graph';

export * from './src/git-graph-types';

export { GitGraph };

export default {
  title: 'GitGraph 提交网络图',
  category: '演进中',
  status: '100%',
  install(app: App): void {
    app.component(GitGraph.name, GitGraph);
  }
};
