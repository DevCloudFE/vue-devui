import type { ComponentInternalInstance, Ref } from 'vue';
import { Column, SortMethod, SortDirection } from '../components/column/column-types';
import { DefaultRow, Table } from '../table-types';

export interface TableStore<T = Record<string, any>> {
  _table: Table<DefaultRow>;
  states: {
    _data: Ref<T[]>;
    _columns: Ref<Column[]>;
    flatColumns: Ref<Column[]>;
    _checkSet: Ref<Set<string>>;
    _checkAll: Ref<boolean>;
    _halfChecked: Ref<boolean>;
    isFixedLeft: Ref<boolean>;
    thList: ComponentInternalInstance[];
    _expandedRows: Ref<Set<string>>;
  };
  insertColumn(column: Column, parent: any): void;
  sortColumn(): void;
  removeColumn(column: Column): void;
  updateColumns(): void;
  getCheckedRows(): T[];
  sortData(direction: SortDirection, sortMethod: SortMethod<T>): void;
  isRowChecked(row: T): boolean;
  checkRow(toggle: boolean, row: T): void;

  // 展开行
  toggleRow(row: T): void;
  expandRow(row: T): void;
  collapseRow(row: T): void;
  isRowExpanded(row: T): boolean;
  getExpandedRows(): T[];
  expandAllRows(): void;
  collapseAllRows(): void;
}
