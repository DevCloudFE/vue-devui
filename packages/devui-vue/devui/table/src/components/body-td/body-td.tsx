import { defineComponent, toRef, inject } from 'vue';
import type { PropType } from 'vue';
import { Column } from '../column/column-types';
import { TABLE_TOKEN } from '../../table-types';
import { useFixedColumn } from '../../composables/use-table';

export default defineComponent({
  name: 'DTableBodyTd',
  props: {
    column: {
      type: Object as PropType<Column>,
      default: () => ({}),
    },
    row: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  setup(props: { column: Column; row: any; index: number }) {
    const table = inject(TABLE_TOKEN);
    const column = toRef(props, 'column');
    const { stickyClass, stickyStyle } = useFixedColumn(column);

    return () => (
      <td class={stickyClass.value} style={stickyStyle.value}>
        {column.value.renderCell?.(props.row, column.value, table.store, props.index)}
      </td>
    );
  },
});
