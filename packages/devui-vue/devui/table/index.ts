import type { App } from 'vue';
import Table from './src/table';
import Column from './src/column/column';
import { Loading } from '../loading/index';

Table.install = function (app: App): void {
  app.directive('dLoading', Loading);
  app.component(Table.name, Table);
  app.component(Column.name, Column);
};

export { Table, Column };

export default {
  title: 'Table 表格',
  category: '数据展示',
  status: '10%',
  install(app: App): void {
    app.use(Table as any);
  }
};
