import { computed, ComputedRef } from 'vue';
import { Column } from '../column/column.type';
import { TableBodyPropsTypes } from './body.type'

interface Data {
  rowColumns: ComputedRef<(Record<string, any> & { columns: Column[]; })[]>
}

export const useTableBody = (props: TableBodyPropsTypes): Data => {
  const states = props.store.states;
  const rowColumns = computed(() => {
    return states._data.value.map((row) => {
      return {
        ...row, 
        columns: states._columns.value
      };
    });
  });

  return { rowColumns };
}