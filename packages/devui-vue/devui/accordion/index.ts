import type { App } from 'vue';
import Accordion from './src/accordion';

Accordion.install = function(app: App) {
  app.component(Accordion.name, Accordion);
};

export { Accordion };

export default {
  title: 'Accordion 手风琴',
  category: '导航',
  status: '10%',
  install(app: App): void {
    app.use(Accordion as any);
  }
};
