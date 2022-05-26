import { defineComponent } from 'vue';
import TH from '../header-th/header-th';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useHeader } from './use-header';
import './header.scss';
import '../body/body.scss';
import { Column } from '../column/column-types';

export default defineComponent({
  name: 'DTableHeader',
  setup() {
    const ns = useNamespace('table');
    const { headerRows } = useHeader();

    return () => (
      <thead class={ns.e('thead')}>
        {headerRows.value.map((subColumns) => (
          <tr>
            {subColumns.map((column: Column, columnIndex: number) => {
              return <TH
                key={columnIndex}
                column={column}
                colspan={column.colSpan}
                rowspan={column.rowSpan}
              />;
            })}
          </tr>
        ))}
      </thead>
    );
  },
});
