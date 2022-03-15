import { App } from 'vue';
import Pagination from './src/pagination';

Pagination.install = (app: App): void => {
  app.component(Pagination.name, Pagination);
};

export { Pagination };

export default {
  title: 'Pagination 分页',
  category: '导航',
  status: '100%',
  install(app: App): void {
    app.use(Pagination as any);
  }
};
