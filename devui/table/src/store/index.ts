import { ref, watch } from 'vue';
import { TablePropsTypes } from '../table.type';
import { Column } from '../column/column.type';

export function createStore(props: TablePropsTypes): any {
  const _data = ref([]);
  const _columns = ref([]);
  updateData();

  watch(() => props.data, updateData, { deep: true });

  function updateData() {
    _data.value = [];
    props.data.forEach((item) => {
      _data.value.push(item);
    });
  }

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