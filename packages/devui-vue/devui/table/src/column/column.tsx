import { inject, defineComponent, onBeforeUnmount, onMounted, toRefs, watch } from 'vue';
import {
  Column,
  TableColumnProps,
  TableColumnPropsTypes,
} from './column.type';
import { TABLE_TOKEN } from '../table.type';
import { createColumn } from './use-column';

export default defineComponent({
  name: 'DColumn',
  props: TableColumnProps,
  setup(props: TableColumnPropsTypes, ctx) {
    /*
      ctx.slots : {
       customFilterTemplate: Slot
      }
     */
    const column = createColumn(toRefs(props), ctx.slots);

    const parent = inject(TABLE_TOKEN);

    onMounted(() => {
      parent.store.insertColumn(column);
      watch(() => column.order, () => {
        parent.store.sortColumn();
      });
    });

    onBeforeUnmount(() => {
      parent.store.removeColumn(column);
    });
  },
  render() {
    return null;
  },
});
