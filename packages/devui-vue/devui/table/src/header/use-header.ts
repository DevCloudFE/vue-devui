import { ref, watch, Ref, shallowRef } from 'vue';
import { Column, FilterResults } from '../column/column.type';
import { TableStore } from '../store';
import { SortDirection } from '../table.type';

export const useSort = (store: TableStore, column: Ref<Column>): Ref<SortDirection> => {
  // 排序功能
  const directionRef = ref<SortDirection>('DESC');
  watch([directionRef, column], ([direction, column]) => {
    if (column.sortable) {
      store.sortData(column.field, direction, column.compareFn);
    }
  }, { immediate: true });

  return directionRef;
};

export const useFliter = (store: TableStore, column: Ref<Column>): Ref<FilterResults> => {
  const filteredRef = shallowRef<FilterResults>();
  watch(filteredRef, (results) => {
    store.filterData(column.value.field, results);
  });
  return filteredRef;
};
