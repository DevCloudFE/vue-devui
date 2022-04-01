import type { Ref } from 'vue';
import { SortDirection } from '../table-types';
import { Column, CompareFn, FilterResults } from '../components/column/column-types';

export interface TableStore<T = Record<string, any>> {
  states: {
    _data: Ref<T[]>;
    _columns: Ref<Column<T>[]>;
    columns: Ref<Column<T>[]>;
    _checkList: Ref<boolean[]>;
    _checkAll: Ref<boolean>;
    _halfChecked: Ref<boolean>;
    isFixedLeft: Ref<boolean>;
  };
  insertColumn(column: Column<T>, parent: any): void;
  sortColumn(): void;
  removeColumn(column: Column<T>): void;
  updateColumns(): void;
  getCheckedRows(): T[];
  sortData(field: string, direction: SortDirection, compareFn: CompareFn<T>): void;
  filterData(field: string, results: FilterResults): void;
  resetFilterData(): void;
}
