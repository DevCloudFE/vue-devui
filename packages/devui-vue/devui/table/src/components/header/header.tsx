import { defineComponent, inject, computed } from 'vue';
import { TABLE_TOKEN } from '../../table-types';
import { Checkbox } from '../../../../checkbox';
import TH from '../header-th/header-th';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import './header.scss';
import '../body/body.scss';

export default defineComponent({
  name: 'DTableHeader',
  setup() {
    const table = inject(TABLE_TOKEN);
    const { _checkAll: checkAll, _halfChecked: halfChecked, _columns: columns, isFixedLeft } = table.store.states;
    const ns = useNamespace('table');

    const thAttrs = computed(() => (isFixedLeft.value ? { class: `${ns.m('sticky-cell')} left`, style: 'left:0;' } : null));
    const checkbox = computed(() =>
      table.props.checkable ? (
        <th {...thAttrs.value}>
          <Checkbox style="padding:10px;" v-model={checkAll.value} halfchecked={halfChecked.value} />
        </th>
      ) : null
    );

    return () => {
      return (
        <thead class={ns.e('thead')}>
          <tr>
            {checkbox.value}
            {columns.value.map((column, index) => (
              <TH key={index} column={column} />
            ))}
          </tr>
        </thead>
      );
    };
  },
});
