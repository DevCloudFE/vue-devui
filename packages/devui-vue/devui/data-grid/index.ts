import type { App } from "vue";
import DataGrid from './src/data-grid';

export * from './src/data-grid-types';
export { DataGrid }

export default {
  title: 'DataGrid 数据表格',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(DataGrid.name, DataGrid);
  }
};
