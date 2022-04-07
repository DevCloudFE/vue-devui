import { ref, watch, Ref, shallowRef, computed } from 'vue';
import type { ComputedRef } from 'vue';
import { Column, FilterResults, SortDirection } from '../column/column-types';
import { TableStore } from '../../store/store-types';

export const useSort = (
  store: TableStore,
  column: Ref<Column>
): { direction: Ref<SortDirection>; sortClass: ComputedRef<Record<string, boolean>> } => {
  const direction = ref<SortDirection>(column.value.sortDirection);
  const sortClass = computed(() => ({
    'sort-active': Boolean(direction.value),
  }));

  watch(
    [direction, column],
    ([directionVal, columnVal]) => {
      if (columnVal.sortable && columnVal.field) {
        store.sortData(columnVal.field, directionVal, columnVal.sortMethod);
      }
    },
    { immediate: true }
  );

  return { direction, sortClass };
};

export const useFilter = (store: TableStore, column: Ref<Column>): Ref<FilterResults> => {
  const filteredRef = shallowRef<FilterResults>();
  watch(filteredRef, (results) => {
    store.filterData(column.value.field, results);
  });
  return filteredRef;
};
