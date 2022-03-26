import { defineComponent, toRef } from 'vue';
import type { PropType } from 'vue';
import { Column } from '../column/column-types';
import { useFixedColumn } from '../../composable/use-table';

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
    const column = toRef(props, 'column');

    // 固定列
    const { stickyCell, offsetStyle } = useFixedColumn(column);

    return () => (
      <td class={stickyCell.value} style={offsetStyle.value}>
        {column.value.renderCell?.(props.row, props.index)}
      </td>
    );
  },
});
