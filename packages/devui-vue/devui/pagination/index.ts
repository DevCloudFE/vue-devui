import { App } from 'vue';
import Pagination from './src/pagination';

export * from './src/pagination-types';

export { Pagination };

export default {
  title: 'Pagination 分页',
  category: '导航',
  status: '100%',
  install(app: App): void {
    app.component(Pagination.name, Pagination);
  }
};
