import { ref, getCurrentInstance } from 'vue';
import { DefaultRow, ITable } from '../table-types';
import { getRowIdentity } from '../utils';
import { UseEditTableCell } from './store-types';

export function useEditTableCell(): UseEditTableCell {
  const tableInstance = getCurrentInstance() as ITable<DefaultRow>;
  const rowKey = tableInstance.props.rowKey || '';
  const tableCellModeMap = ref(new Map());
  const setCellMode = (row: DefaultRow, rowIndex: number, fields: string | string[], cellMode: string) => {
    if (Array.isArray(fields)) {
      fields.forEach((item) => {
        const cellKey = `${getRowIdentity(row, rowKey, rowIndex)}-${item}-cell`;
        tableCellModeMap.value.set(cellKey, cellMode);
      });
    } else {
      const cellKey = `${getRowIdentity(row, rowKey, rowIndex)}-${fields}-cell`;
      tableCellModeMap.value.set(cellKey, cellMode);
    }
  };

  const resetCellMode = () => {
    for (const item of tableCellModeMap.value.keys()) {
      tableCellModeMap.value.set(item, 'readonly');
    }
  };

  return {
    tableCellModeMap,
    setCellMode,
    resetCellMode,
  };
}
