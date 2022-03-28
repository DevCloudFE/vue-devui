import { defineComponent, inject, computed } from 'vue';
import { TABLE_TOKEN } from '../../table-types';
import TD from '../body-td/body-td';
import { Checkbox } from '../../../../checkbox';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useMergeCell } from './use-body';
import './body.scss';

export default defineComponent({
  name: 'DTableBody',
  setup() {
    const table = inject(TABLE_TOKEN);
    const { _data: data, _columns: columns, _checkList: checkList, isFixedLeft } = table.store.states;
    const ns = useNamespace('table');
    const hoverEnabled = computed(() => table.props.rowHoveredHighlight);
    const { tableSpans, removeCells } = useMergeCell();
    const tdAttrs = computed(() => (isFixedLeft.value ? { class: `${ns.m('sticky-cell')} left`, style: 'left:0;' } : null));

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
              {columns.value.map((column, columnIndex) => {
                const cellId = `${rowIndex}-${columnIndex}`;
                const [rowspan, colspan] = tableSpans.value[cellId] ?? [1, 1];

                if (removeCells.value.includes(cellId)) {
                  return null;
                }
                return <TD column={column} index={columnIndex} row={row} rowspan={rowspan} colspan={colspan} />;
              })}
            </tr>
          );
        })}
      </tbody>
    );
  },
});
