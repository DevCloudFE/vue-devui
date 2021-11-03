import { defineComponent, inject, computed } from 'vue';
import { TableBodyProps, TableBodyPropsTypes } from './body.type'
import { useTableBody } from './use-body';
import { Table, TABLE_TOKEN } from '../table.type';
import { Checkbox } from '../../../checkbox';

import './body.scss';

export default defineComponent({
  name: 'DTableBody',
  props: TableBodyProps,
  setup(props: TableBodyPropsTypes) {
    const { rowColumns } = useTableBody(props);

    const parent: Table = inject(TABLE_TOKEN);
    const hoverEnabled = computed(() => parent.props.rowHoveredHighlight);

    const renderCheckbox = (index: number) => {
      const checkList = props.store.states._checkList;
      return parent.props.checkable ? (
        <td>
          <Checkbox v-model={checkList.value[index]} />
        </td>
      ) : null
    };

    return () => (
      <tbody class="devui-tbody">
        {rowColumns.value.map((row, rowIndex) => {
          return (
            <tr key={rowIndex} class={{ 'hover-enabled': hoverEnabled.value }}>
              {renderCheckbox(rowIndex)}
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
  }
});