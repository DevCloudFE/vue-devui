import { inject, defineComponent, onBeforeUnmount, onMounted, toRefs } from 'vue';
import {
  Column,
  TableColumnProps,
  TableColumnPropsTypes,
} from './column.type'
import { TABLE_TOKEN } from '../table.type';
import { createColumn } from './use-column';

export default defineComponent({
  name: 'DColumn',
  props: TableColumnProps,
  setup(props: TableColumnPropsTypes) {
    const column = createColumn(toRefs(props));

    const parent = inject(TABLE_TOKEN);

    onMounted(() => {
      parent.store.insertColumn(column);
    });

    onBeforeUnmount(() => {
      parent.store.removeColumn(column);
    });
  },
  render() {
    return null;
  },
});