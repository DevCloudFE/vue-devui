import { watch, Ref, ref } from 'vue';
import { Column } from '../column/column.type';

export interface TableStore<T = Record<string, any>> {
  insertColumn(column: Column): void
  states: {
    _data: Ref<T[]>
    _columns: Ref<Column[]>
  }
}

export function createStore<T>(dataSource: Ref<T[]>): TableStore<T> {
  const _data: Ref<T[]> = ref([]);
  const _columns: Ref<Column[]> = ref([]);

  watch(dataSource, (value: T[]) => {
    _data.value = [...value];
  }, { deep: true, immediate: true });

  const insertColumn = (column: Column) => {
    _columns.value.push(column);
  };

  return {
    insertColumn,
    states: {
      _data,
      _columns,
    },
  };
}