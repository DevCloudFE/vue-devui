import type { Ref } from 'vue';
import { SortDirection } from '../components/sort/sort-types';
import { Column, SortMethod, FilterResults } from '../components/column/column-types';

export interface TableStore<T = Record<string, any>> {
  states: {
    _data: Ref<T[]>;
    _columns: Ref<Column[]>;
    flatColumns: Ref<Column[]>;
    _checkList: Ref<boolean[]>;
    _checkAll: Ref<boolean>;
    _halfChecked: Ref<boolean>;
    isFixedLeft: Ref<boolean>;
  };
  insertColumn(column: Column, parent: any): void;
  sortColumn(): void;
  removeColumn(column: Column): void;
  updateColumns(): void;
  getCheckedRows(): T[];
  sortData(field: string, direction: SortDirection, sortMethod: SortMethod<T>): void;
  filterData(field: string, results: FilterResults): void;
  resetFilterData(): void;
}
