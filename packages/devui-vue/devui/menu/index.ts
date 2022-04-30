import type { App } from 'vue';
import MenuItem from './src/components/menu-item';
import SubMenu from './src/components/sub-menu';
import Menu from './src/menu';

export { Menu,SubMenu,MenuItem };

export default {
  title: 'Menu 菜单',
  category: '布局',
  status: "60%", // TODO: 组件若开发完成则填入"100%"，并删除该注释
  install(app: App): void {
    app.component(Menu.name, Menu);
    app.component(MenuItem.name, MenuItem);
    app.component(SubMenu.name, SubMenu);
  }
};
