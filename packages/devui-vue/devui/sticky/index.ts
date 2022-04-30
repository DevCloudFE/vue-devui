import type { App } from 'vue';
import Sticky from './src/sticky';

Sticky.install = function(app: App): void {
  app.component(Sticky.name, Sticky);
};

export { Sticky };

export default {
  title: 'Sticky 便贴',
  category: '通用',
  status: '50%',
  install(app: App): void {
    app.use(Sticky as any);
  }
};
