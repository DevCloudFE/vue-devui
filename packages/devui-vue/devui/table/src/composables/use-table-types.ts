import type { ComponentInternalInstance } from 'vue';
import type { SortDirection, SortMethod } from '../components/column/column-types';

export interface UseHorizontalScroll {
  onTableScroll: (e: Event) => void;
}

export interface UseSort<T> {
  thList: ComponentInternalInstance[];
  collectTh: (th: ComponentInternalInstance) => void;
  sortData: (direction: SortDirection, sortMethod: SortMethod<T> | undefined) => void;
}
