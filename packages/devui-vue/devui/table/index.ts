import type { App } from 'vue';
import Table from './src/table';
import Column from './src/components/column/column';

export * from './src/table-types';

export { Table, Column };

export default {
  title: 'Table 表格',
  category: '数据展示',
  status: '50%',
  install(app: App): void {
    app.component(Table.name, Table);
    app.component(Column.name, Column);
  },
};
