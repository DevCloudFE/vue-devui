import type { ComputedRef, Ref } from 'vue';
import { FilterConfig, SortDirection } from '../column/column-types';

export interface UseSort {
  direction: Ref<SortDirection>;
  sortClass: ComputedRef<Record<string, boolean>>;
  handleSort: (val: SortDirection) => void;
  clearSortOrder: () => void;
}

export interface UseFilter {
  filterClass: ComputedRef<Record<string, boolean>>;
  handleFilter: (val: FilterConfig | FilterConfig[]) => void;
}
