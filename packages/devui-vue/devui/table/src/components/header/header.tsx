import { defineComponent, inject, computed } from 'vue';
import { TABLE_TOKEN } from '../../table-types';
import { Checkbox } from '../../../../checkbox';
import TH from '../header-th/header-th';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useHeader } from './use-header';
import './header.scss';
import '../body/body.scss';

export default defineComponent({
  name: 'DTableHeader',
  setup() {
    const table = inject(TABLE_TOKEN);
    const { _checkAll: checkAll, _halfChecked: halfChecked, isFixedLeft } = table.store.states;
    const ns = useNamespace('table');
    const { headerRows } = useHeader();

    const thAttrs = computed(() => (isFixedLeft.value ? { class: `${ns.m('sticky-cell')} left`, style: 'left:0;' } : null));
    const checkbox = computed(() =>
      table.props.checkable ? (
        <th class={ns.e('checkable-cell')} {...thAttrs.value}>
          <Checkbox v-model={checkAll.value} halfchecked={halfChecked.value} />
        </th>
      ) : null
    );

    return () => (
      <thead class={ns.e('thead')}>
        {headerRows.value.map((subColumns, rowIndex) => (
          <tr>
            {checkbox.value}
            {subColumns.map((column, columnIndex) => (
              <TH key={columnIndex} column={column} colspan={column.colSpan} rowspan={column.rowSpan} />
            ))}
          </tr>
        ))}
      </thead>
    );
  },
});
