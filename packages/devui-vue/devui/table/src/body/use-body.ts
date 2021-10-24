import { computed } from 'vue';
import { TableBodyPropsTypes } from './body.type'

export function useTableBody(props: TableBodyPropsTypes): any {
  const storeData = props.store.states;
  const rowColumns = computed(() => {
    return storeData._data.value.map((row) => {
      const obj = Object.assign({}, row);
      obj.columns = storeData._columns.value;
      return obj;
    });
  });

  return { rowColumns };
}