import type { ComponentInternalInstance, Ref } from 'vue';
import { Column, SortMethod, SortDirection } from '../components/column/column-types';
import { DefaultRow, ITable } from '../table-types';

export interface TableStore<T = Record<string, any>> {
  _table: ITable<DefaultRow>;
  states: {
    _data: Ref<T[]>;
    _columns: Ref<Column[]>;
    flatColumns: Ref<Column[]>;
    _checkSet: Ref<Set<string>>;
    _checkAll: Ref<boolean>;
    _halfChecked: Ref<boolean>;
    isFixedLeft: Ref<boolean>;
    thList: ComponentInternalInstance[];
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
  toggleRowExpansion(row: T): void;
  isRowExpanded(row: T): boolean;
  setExpandRows: (rowKeys: string[]) => void;
}

export interface UseExpand {
  isRowExpanded: (row: DefaultRow) => boolean;
  updateExpandRows: () => void;
  setExpandRows: (rowKeys: string[]) => void;
  toggleRowExpansion: (row: DefaultRow, expanded?: boolean) => void;
}
