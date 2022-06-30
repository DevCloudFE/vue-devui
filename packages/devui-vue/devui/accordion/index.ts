import type { App } from 'vue';
import Accordion from './src/accordion';

export { Accordion };

export default {
  title: 'Accordion 手风琴',
  category: '导航',
  status: '10%',
  install(app: App): void {
    app.component(Accordion.name, Accordion);
  }
};
