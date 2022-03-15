import { defineComponent } from 'vue';
import { apiTableProps, ITableColumn, ITableDataRow } from './devui-api-table.type';

export default defineComponent({
  name: 'DevuiApiTable',
  props: apiTableProps,
  render() {
    const { columns, data } = this;

    const renderTd = (params: { col: ITableColumn; row: ITableDataRow }) => {
      const { col, row } = params;

      const value = row[col.key];

      if ('type' in col) {
        return <a href={`#${value}`}>{value}</a>;
      }

      return value;
    };

    return (
      <table>
        <thead>
          {columns.map((col) => (
            <th>{col.title}</th>
          ))}
        </thead>
        {data.map((row) => (
          <tr>
            {columns.map((col) => (
              <td>{renderTd({ col, row })}</td>
            ))}
          </tr>
        ))}
      </table>
    );
  }
});
