import { defineComponent, inject, computed } from 'vue';
import { TableBodyProps, TableBodyPropsTypes } from './body.type'
import { useTableBody } from './use-body';
import { Table } from '../table.type';

import './body.scss';

export default defineComponent({
  name: 'DTableBody',
  props: TableBodyProps,
  setup(props: TableBodyPropsTypes) {
    const { rowColumns } = useTableBody(props);

    const parent: Table = inject('table');
    const hoverEnabled = computed(() => parent.props.rowHoveredHighlight);

    return () => (
      <tbody class="devui-tbody">
        {rowColumns.value.map((row, rowIndex) => {
          return (
            <tr key={rowIndex} class={{ 'hover-enabled': hoverEnabled.value }}>
              {row.columns.map((column, index) => {
                return (
                  <td key={index}>{column.renderCell({ row, column, $index: index })}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    )
  },
  render() {
    const { rowColumns, hoverDisabled } = this;

    return (
      <tbody class="devui-tbody">
        {rowColumns.map((row, rowIndex) => {
          return (
            <tr key={rowIndex} class={{ 'hover-disabled': hoverDisabled }}>
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