import { defineComponent, inject, computed } from 'vue';
import { TABLE_TOKEN, DefaultRow, Table } from '../../table-types';
import { Column } from '../column/column-types';
import { CellClickArg } from './body-types';
import TD from '../body-td/body-td';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useMergeCell } from './use-body';
import './body.scss';

export default defineComponent({
  name: 'DTableBody',
  setup() {
    const table = inject(TABLE_TOKEN) as Table;
    const { _data: data, flatColumns } = table.store.states;
    const ns = useNamespace('table');
    const hoverEnabled = computed(() => table.props.rowHoveredHighlight);
    const { tableSpans, removeCells } = useMergeCell();
    const onCellClick = (cellClickArg: CellClickArg) => {
      table.emit('cell-click', cellClickArg);
    };

    return () => (
      <tbody class={ns.e('tbody')}>
        {
          data.value.map((row: DefaultRow, rowIndex: number) => {
            const tableRow = () => {
              return <tr key={rowIndex} class={{ 'hover-enabled': hoverEnabled.value, 'expanded': table.store.isRowExpanded(row) }}>
                {flatColumns.value.map((column: Column, columnIndex: number) => {
                  const cellId = `${rowIndex}-${columnIndex}`;
                  const [rowspan, colspan] = tableSpans.value[cellId] ?? [1, 1];

                  if (removeCells.value.includes(cellId)) {
                    return null;
                  }
                  return (
                    <TD
                      column={column}
                      index={rowIndex}
                      row={row}
                      rowspan={rowspan}
                      colspan={colspan}
                      onClick={() => onCellClick({ rowIndex, columnIndex, column, row })}
                    />
                  );
                })}
              </tr>;
            };

            const expandedRow = () => {
              return flatColumns.value.some((column: Column) => column.type === 'expand') &&
              <tr>
                <td colspan={flatColumns.value.length}>
                  {
                    flatColumns.value.filter((column: Column) => column.type === 'expand')?.[0]?.slots?.default?.({
                      row
                    })
                  }
                </td>
              </tr>;
            };

            return <>
              { tableRow() }
              { table.store.isRowExpanded(row) && expandedRow() }
            </>;
          })
        }
      </tbody>
    );
  },
});
