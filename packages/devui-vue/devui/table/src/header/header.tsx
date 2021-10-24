import { defineComponent, toRefs } from 'vue';
import { TableHeaderProps, TableHeaderPropsTypes } from './header.type'
import './header.scss';

export default defineComponent({
  name: 'DTableHeader',
  props: TableHeaderProps,
  setup(props: TableHeaderPropsTypes) {
    const { store } = toRefs(props)
    const columns = store.value.states._columns.value;

    return {
      columns,
    }
  },
  render() {
    const { columns } = this
    return (
      <thead class="devui-thead">
        <tr>
          {columns.map((column, index) => {
            return <th key={index}>{column.renderHeader()}</th>;
          })}
        </tr>
      </thead>
    )
  }
});