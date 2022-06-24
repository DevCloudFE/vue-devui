import type { App } from 'vue';
import Dropdown from './src/dropdown';
import DropdownMenu from './src/dropdown-menu';
export * from './src/dropdown-menu-types';

export { Dropdown, DropdownMenu };

export default {
  title: 'Dropdown 下拉菜单',
  category: '导航',
  status: '50%',
  install(app: App): void {
    app.component(Dropdown.name, Dropdown);
    app.component(DropdownMenu.name, DropdownMenu);
  },
};
