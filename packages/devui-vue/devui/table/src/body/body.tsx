import { defineComponent, inject, computed } from 'vue';
import { TableBodyProps, TableBodyPropsTypes } from './body.type'
import { TABLE_TOKEN } from '../table.type';
import { Checkbox } from '../../../checkbox';

import './body.scss';

export default defineComponent({
  name: 'DTableBody',
  // props: TableBodyProps,
  setup(props: TableBodyPropsTypes) {
    const parent = inject(TABLE_TOKEN);
    const {
      _data: data,
      _columns: columns,
      _checkList: checkList
    } = parent.store.states;

    // 移动到行上是否高亮
    const hoverEnabled = computed(() => parent.props.rowHoveredHighlight);

    // 行前的 checkbox
    const renderCheckbox = (index: number) => parent.props.checkable ? (
      <td>
        <Checkbox v-model={checkList.value[index]} />
      </td>
    ) : null;

    return () => (
      <tbody class="devui-tbody">
        {data.value.map((row, rowIndex) => {
          return (
            <tr key={rowIndex} class={{ 'hover-enabled': hoverEnabled.value }}>
              {renderCheckbox(rowIndex)}
              {columns.value.map((column, index) => {
                return (
                  <td key={index}>{column.renderCell(row, index)}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    )
  }
});