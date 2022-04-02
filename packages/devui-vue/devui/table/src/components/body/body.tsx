import { defineComponent, inject, computed } from 'vue';
import { TABLE_TOKEN, DefaultRow } from '../../table-types';
import { Column } from '../column/column-types';
import TD from '../body-td/body-td';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useMergeCell } from './use-body';
import './body.scss';

export default defineComponent({
  name: 'DTableBody',
  setup() {
    const table = inject(TABLE_TOKEN);
    const { _data: data, columns } = table.store.states;
    const ns = useNamespace('table');
    const hoverEnabled = computed(() => table.props.rowHoveredHighlight);
    const { tableSpans, removeCells } = useMergeCell();

    return () => (
      <tbody class={ns.e('tbody')}>
        {data.value.map((row: DefaultRow, rowIndex: number) => {
          return (
            <tr key={rowIndex} class={{ 'hover-enabled': hoverEnabled.value }}>
              {columns.value.map((column: Column, columnIndex: number) => {
                const cellId = `${rowIndex}-${columnIndex}`;
                const [rowspan, colspan] = tableSpans.value[cellId] ?? [1, 1];

                if (removeCells.value.includes(cellId)) {
                  return null;
                }
                return <TD column={column} index={rowIndex} row={row} rowspan={rowspan} colspan={colspan} />;
              })}
            </tr>
          );
        })}
      </tbody>
    );
  },
});
