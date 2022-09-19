import type { App } from 'vue';
import List from './src/list';
import ListItem from './src/list-item';
import ListItemMeta from './src/list-item-meta';

export { List, ListItem, ListItemMeta };

export default {
  title: 'List 列表',
  category: '数据展示',
  status: '10%',
  install(app: App): void {
    app.component(List.name, List);
    app.component(ListItem.name, ListItem);
    app.component(ListItemMeta.name, ListItemMeta);
  },
};
