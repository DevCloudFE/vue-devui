import { defineComponent } from 'vue';
import { TableHeaderProps, TableHeaderPropsTypes } from './header.type'
import './header.scss';

export default defineComponent({
  name: 'DTableHeader',
  props: TableHeaderProps,
  setup(props: TableHeaderPropsTypes) {
    return () => {
      const columns = props.store.states._columns;
      return (
        <thead class="devui-thead">
          <tr>
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