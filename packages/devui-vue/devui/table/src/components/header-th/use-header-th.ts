import { ref, watch, Ref, shallowRef, computed, getCurrentInstance, inject, onMounted } from 'vue';
import type { ComputedRef } from 'vue';
import { Column, FilterResults, SortDirection } from '../column/column-types';
import { TableStore } from '../../store/store-types';
import { TABLE_TOKEN } from '../../table-types';

interface UseSort {
  direction: Ref<SortDirection>;
  sortClass: ComputedRef<Record<string, boolean>>;
  handleSort: (val: SortDirection) => void;
  clearSortOrder: () => void;
}

export const useSort = (column: Ref<Column>): UseSort => {
  const table = inject(TABLE_TOKEN);
  const store = table.store;
  const direction = ref<SortDirection>(column.value.sortDirection);
  const sortClass = computed(() => ({
    'sort-active': Boolean(direction.value),
  }));
  const thInstance = getCurrentInstance();
  thInstance && store.states.thList.push(thInstance);
  onMounted(() => {
    column.value.sortable && column.value.sortDirection && store.sortData?.(direction.value, column.value.sortMethod);
  });
  const execClearSortOrder = () => {
    store.states.thList.forEach((th) => {
      if (th !== thInstance) {
        th.exposed?.clearSortOrder?.();
      }
    });
  };

  const handleSort = (val: SortDirection) => {
    direction.value = val;
    execClearSortOrder();
    store.sortData?.(direction.value, column.value.sortMethod);
    table.emit('sort-change', { field: column.value.field, direction: direction.value });
  };

  const clearSortOrder = () => {
    direction.value = '';
  };

  return { direction, sortClass, handleSort, clearSortOrder };
};

export const useFilter = (store: TableStore, column: Ref<Column>): Ref<FilterResults> => {
  const filteredRef = shallowRef<FilterResults>();
  watch(filteredRef, (results) => {
    store.filterData(column.value.field, results);
  });
  return filteredRef;
};
