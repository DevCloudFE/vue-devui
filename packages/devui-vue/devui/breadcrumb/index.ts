import type { App } from 'vue';
import Breadcrumb from './src/breadcrumb';
import BreadcrumbItem from './src/breadcrumb-item';

export * from './src/breadcrumb-types';
export * from './src/breadcrumb-item-types';

export { Breadcrumb };

export default {
  title: 'Breadcrumb 面包屑',
  category: '导航',
  status: '50%',
  install(app: App): void {
    app.component(Breadcrumb.name, Breadcrumb);
    app.component(BreadcrumbItem.name, BreadcrumbItem);
  },
};
