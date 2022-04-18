import type { App } from 'vue';
import VirtualList from './src/virtual-list';

export { VirtualList };

export default {
  title: 'VirtualList 虚拟列表',
  category: '通用',
  status: '50%',
  install(app: App): void {
    app.component(VirtualList.name, VirtualList);
  }
};
