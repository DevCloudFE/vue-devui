import type { App } from 'vue';
import Splitter from './src/splitter';
import SplitterPane from './src/splitter-pane';

Splitter.install = function (app: App): void {
  app.component(Splitter.name, Splitter);
  app.component(SplitterPane.name, SplitterPane);
};

export { Splitter };

export default {
  title: 'Splitter 分割器',
  category: '布局',
  status: '100%',
  install(app: App): void {
    app.use(Splitter as any);
  },
};
