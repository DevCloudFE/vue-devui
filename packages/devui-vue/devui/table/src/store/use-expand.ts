import { getCurrentInstance, ref } from 'vue';
import type { Ref } from 'vue';
import { DefaultRow, ITable } from '../table-types';
import { UseExpand } from './store-types';
import { getRowKeysMap, toggleRowExpandStatus } from '../utils';

export function useExpand(dataSource: Ref<DefaultRow[]>): UseExpand {
  const tableInstance = getCurrentInstance() as ITable<DefaultRow>;
  const rowKey = tableInstance.props.rowKey || '';
  const _expandedRows: Ref<DefaultRow[]> = ref([]);

  const setExpandRows = (rowKeys: string[]) => {
    const data = dataSource.value || [];
    const rowKeysMap = getRowKeysMap(data, rowKey);
    _expandedRows.value = rowKeys.reduce((pre: DefaultRow[], cur: string) => {
      const currentRow = rowKeysMap[cur];
      if (currentRow) {
        pre.push(currentRow.row);
      }
      return pre;
    }, []);
  };

  const toggleRowExpansion = (row: DefaultRow, expanded?: boolean) => {
    const isChanged = toggleRowExpandStatus(_expandedRows.value, row, expanded);
    if (isChanged) {
      tableInstance.emit('expand-change', row, _expandedRows.value.slice());
    }
  };

  const isRowExpanded = (row: DefaultRow): boolean => {
    return _expandedRows.value.includes(row);
  };

  return {
    isRowExpanded,
    toggleRowExpansion,
  };
}
