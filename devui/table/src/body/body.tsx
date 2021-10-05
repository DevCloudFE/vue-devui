import { defineComponent } from 'vue';
import { TableBodyProps, TableBodyPropsTypes } from './body.type'
import { useTableBody } from './use-body';
import './body.scss';

export default defineComponent({
  name: 'DTableBody',
  props: TableBodyProps,
  setup(props: TableBodyPropsTypes) {
    const { rowColumns } = useTableBody(props);

    return { rowColumns };
  },
  render() {
    const { rowColumns } = this;

    return (
      <tbody class="devui-tbody">
        {rowColumns.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {row.columns.map((column, index) => {
                return (
                  <td key={index}>{column.renderCell({ row, column, $index: index })}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  },
});