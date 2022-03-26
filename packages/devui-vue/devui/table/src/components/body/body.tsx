import { defineComponent, inject, computed, PropType, toRef } from 'vue';
import { TABLE_TOKEN } from '../../table-types';
import { Column } from '../column/column-types';
import { Checkbox } from '../../../../checkbox';
import { useFixedColumn } from '../../composable/use-table';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import './body.scss';

export default defineComponent({
  name: 'DTableBody',
  setup() {
    const table = inject(TABLE_TOKEN);
    const { _data: data, _columns: columns, _checkList: checkList, isFixedLeft } = table.store.states;
    const ns = useNamespace('table');

    // 移动到行上是否高亮
    const hoverEnabled = computed(() => table.props.rowHoveredHighlight);

    // 行前的 checkbox
    const tdAttrs = computed(() =>
      isFixedLeft.value
        ? {
            class: `${ns.m('sticky-cell')} left`,
            style: 'left:0;',
          }
        : null
    );
    const renderCheckbox = (index: number) =>
      table.props.checkable ? (
        <td {...tdAttrs.value}>
          <Checkbox v-model={checkList.value[index]} />
        </td>
      ) : null;

    return () => (
      <tbody class={ns.e('tbody')}>
        {data.value.map((row, rowIndex) => {
          return (
            <tr key={rowIndex} class={{ 'hover-enabled': hoverEnabled.value }}>
              {renderCheckbox(rowIndex)}
              {columns.value.map((column, index) => (
                <TD column={column} index={index} row={row} />
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  },
});

const TD = defineComponent({
  props: {
    column: {
      type: Object as PropType<Column>,
    },
    row: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  setup(props: { column: Column; row: any; index: number }) {
    const column = toRef(props, 'column');

    // 固定列
    const { stickyCell, offsetStyle } = useFixedColumn(column);

    return () => (
      <td class={stickyCell.value} style={offsetStyle.value}>
        {column.value.renderCell(props.row, props.index)}
      </td>
    );
  },
});
