import { defineComponent, inject, computed } from 'vue';
import { TableHeaderProps, TableHeaderPropsTypes } from './header.type'
import './header.scss';
import { TABLE_TOKEN } from '../table.type';
import { Checkbox } from '../../../checkbox';

export default defineComponent({
  name: 'DTableHeader',
  props: TableHeaderProps,
  setup(props: TableHeaderPropsTypes) {
    const table = inject(TABLE_TOKEN);

    const checkbox = computed(() => {
      return table.props.checkable ? (
        <th>
          <Checkbox v-model={table.store.states._checkAll.value} />
        </th>
      ) : null
    });

    return () => {
      const columns = props.store.states._columns;
      return (
        <thead class="devui-thead">
          <tr>
            {checkbox.value}
            {columns.value.map((column, index) => (
              <th key={index}>
                {column.renderHeader()}
              </th>
            ))}
          </tr>
        </thead>
      )
    }
  }
});