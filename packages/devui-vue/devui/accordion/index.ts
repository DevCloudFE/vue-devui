import type { App } from 'vue';
import Accordion from './src/accordion';

export { Accordion };

export default {
  title: 'Accordion 手风琴',
  category: '导航',
  status: '10%',
  deprecated: {
    value: true,
    reason: 'Accordion 是 Menu 组件的一种特性形态(垂直方向上的菜单)，应该使用更通用的 Menu 替代。'
  },
  install(app: App): void {
    app.component(Accordion.name, Accordion);
  }
};
