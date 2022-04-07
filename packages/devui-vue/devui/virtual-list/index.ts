import type { App } from 'vue';
import VirtualList from './src/virtual-list';

export { VirtualList };

export default {
  title: 'VirtualList 虚拟列表',
  category: '通用',
  status: '10%',
  install(app: App): void {
    app.use(VirtualList as any);
    app.component(VirtualList.name, VirtualList);
  }
};
