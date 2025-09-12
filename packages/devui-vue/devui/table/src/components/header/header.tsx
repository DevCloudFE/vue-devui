import { defineComponent } from 'vue';
import TH from '../header-th/header-th';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useHeader } from './use-header';
import './header.scss';
import '../body/body.scss';
import { LevelColumn } from '../column/column-types';

export default defineComponent({
  name: 'DTableHeader',
  setup() {
    const ns = useNamespace('table');
    const { headerRows } = useHeader();

    return () => (
      <thead class={ns.e('thead')}>
        {headerRows.value.map((subColumns) => (
          <tr>
            {subColumns.map((column: LevelColumn, columnIndex: number) => {
              return (
                <TH
                  key={columnIndex}
                  column={column}
                  colspan={column.colSpan}
                  rowspan={column.rowSpan}
                  class={{
                    [ns.m('last-sticky-left')]: column.fixedLeft && !subColumns[columnIndex + 1]?.fixedLeft,
                    [ns.m('first-sticky-right')]: column.fixedRight && !subColumns[columnIndex - 1]?.fixedRight,
                  }}
                />
              );
            })}
          </tr>
        ))}
      </thead>
    );
  },
});
