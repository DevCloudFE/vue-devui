import { defineComponent, inject } from 'vue';
import { TABLE_TOKEN, DefaultRow, ITableInstanceAndDefaultRow } from '../../table-types';
import { Column } from '../column/column-types';
import { CellClickArg, RowClickArg } from './body-types';
import TD from '../body-td/body-td';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useMergeCell, useBodyRender, useLazyLoad } from './use-body';
import './body.scss';

export default defineComponent({
  name: 'DTableBody',
  setup() {
    const table = inject(TABLE_TOKEN) as ITableInstanceAndDefaultRow;
    const { flatColumns, flatRows } = table.store.states;
    const ns = useNamespace('table');
    const { tableSpans, removeCells } = useMergeCell();
    const { getTableRowClass } = useBodyRender();
    const { lazy, lazyFlagRef } = useLazyLoad();
    const onCellClick = (cellClickArg: CellClickArg) => {
      table.emit('cell-click', cellClickArg);
    };
    const onRowClick = (rowClickArg: RowClickArg) => {
      table.emit('row-click', rowClickArg);
    };

    return () => (
      <tbody class={ns.e('tbody')}>
        {flatRows.value.map((row: DefaultRow, rowIndex: number) => (
          <>
            <tr key={rowIndex} class={getTableRowClass(row)} onClick={() => onRowClick({ row })}>
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
                    class={{
                      [ns.m('last-sticky-left')]: column.fixedLeft && !flatColumns.value[columnIndex + 1]?.fixedLeft,
                      [ns.m('first-sticky-right')]: column.fixedRight && !flatColumns.value[columnIndex - 1]?.fixedRight,
                    }}
                    onCellClick={() => onCellClick({ rowIndex, columnIndex, column, row })}
                  />
                );
              })}
            </tr>
            {flatColumns.value.some((column: Column) => column.type === 'expand') && table.store.isRowExpanded(row) && (
              <tr>
                <td colspan={flatColumns.value.length}>
                  {flatColumns.value
                    .filter((column: Column) => column.type === 'expand')?.[0]
                    ?.slots?.default?.({
                      row,
                    })}
                </td>
              </tr>
            )}
          </>
        ))}
        {lazy && <span ref={lazyFlagRef} class={ns.e('lazy__flag')}></span>}
      </tbody>
    );
  },
});
