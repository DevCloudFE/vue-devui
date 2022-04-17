import type { App } from 'vue';
import List from './src/list';
import ListItem from './src/list-item';

export { List, ListItem };

export default {
  title: 'List 列表',
  category: '数据展示',
  status: '10%',
  install(app: App): void {
    app.component(List.name, List);
    app.component(ListItem.name, ListItem);
  },
};
