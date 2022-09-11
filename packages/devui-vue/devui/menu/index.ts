import type { App } from 'vue';
import MenuItem from './src/components/menu-item/menu-item';
import SubMenu from './src/components/sub-menu/sub-menu';
import Menu from './src/menu';

export { Menu, SubMenu, MenuItem };

export default {
  title: 'Menu 菜单',
  category: '导航',
  status: '100%',
  install(app: App): void {
    app.component(Menu.name, Menu);
    app.component(MenuItem.name, MenuItem);
    app.component(SubMenu.name, SubMenu);
  },
};
