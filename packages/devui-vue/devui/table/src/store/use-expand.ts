import { getCurrentInstance, nextTick, ref } from 'vue';
import type { Ref } from 'vue';
import { DefaultRow, ITable } from '../table-types';
import { UseExpand } from './store-types';
import { getRowIdentity, getRowKeysMap, toggleRowExpandStatus, toggleRowVisible } from '../utils';

export function useExpand(dataSource: Ref<DefaultRow[]>, table: ITable<DefaultRow>): UseExpand {
  const tableInstance = getCurrentInstance() as ITable<DefaultRow>;
  const rowKey = tableInstance.props.rowKey || '';
  const defaultExpandAll = ref(tableInstance.props.defaultExpandAll);
  const _expandedRows: Ref<DefaultRow[]> = ref([]);

  const updateExpandRows = () => {
    if (defaultExpandAll.value) {
      _expandedRows.value = dataSource.value.slice();
    } else {
      _expandedRows.value = [];
    }
  };

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

  const isRowExpanded = (row: DefaultRow): boolean => {
    return _expandedRows.value.includes(row);
  };

  const doToggleRowVisible = (expand: boolean, row: DefaultRow) => {
    if (row.children?.length) {
      const key = getRowIdentity(row, rowKey);
      if (expand && isRowExpanded(row)) {
        toggleRowVisible(true, table, key);
      }
      if (!expand) {
        toggleRowVisible(false, table, key);
      }
      row.children.forEach((child: DefaultRow) => {
        doToggleRowVisible(expand, child);
      });
    }
  };

  const toggleRowExpansion = (row: DefaultRow, expanded?: boolean) => {
    const isChanged = toggleRowExpandStatus(_expandedRows.value, row, expanded);
    if (isChanged) {
      const tempExpandedRows = _expandedRows.value.slice();
      tableInstance.emit('expand-change', row, tempExpandedRows);

      // 暂不支持树状表格虚拟滚动
      if (row.id) {
        const id = Number(row.id) - 1;
        nextTick(() => {
          const expandedRow = table.tableContainerRef.value.querySelectorAll('tr[class]')[id];
          if (new Set(tempExpandedRows).has(row)) {
            // console.log('has', row);
            const { clientHeight } = expandedRow.nextSibling as HTMLElement;

            const { changeHeightList } = table.store;
            changeHeightList(id, clientHeight);
          } else {
            // console.log('del', row);
            const {
              changeHeightList,
              states: { heightList },
            } = table.store;
            if (heightList.value.length) {
              const { top, bottom } = heightList.value[id];
              const height = bottom - top;
              if (height !== expandedRow.clientHeight) {
                changeHeightList(id, height - expandedRow.clientHeight);
              }
            }
          }
        });
      }
    }
    // 暂不支持展开行(column的type==expand)和树形表格同时使用，展开行优先级高
    if (!table.store.states.flatColumns.value.some((column) => column.type === 'expand')) {
      doToggleRowVisible(isRowExpanded(row), row);
    }
  };

  return {
    isRowExpanded,
    updateExpandRows,
    setExpandRows,
    toggleRowExpansion,
  };
}
