import { h } from 'vue';
import type { VNode } from 'vue';
import { DefaultRow, TableProps } from '../../table-types';
import { Column } from './column-types';
import { TableStore } from '../../store/store-types';
import { Checkbox } from '../../../../checkbox';
import { Icon } from '../../../../icon';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { getRowIdentity } from '../../utils';
import './column.scss';

const ns = useNamespace('table');

export const cellMap = {
  checkable: {
    renderHeader(column: Column, store: TableStore): VNode {
      return h(Checkbox, {
        modelValue: store.states._checkAll.value,
        halfChecked: store.states._halfChecked.value,
        onChange: (val: boolean) => {
          store.states._checkAll.value = val;
          store._table.emit('check-all-change', val, store.getCheckedRows());
        },
      });
    },
    renderCell(rowData: DefaultRow, column: Column, store: TableStore, rowIndex: number): VNode {
      return h(Checkbox, {
        modelValue: store.isRowChecked(rowData, rowIndex),
        onChange: (val: boolean) => {
          store.checkRow(val, rowData, rowIndex);
          store._table.emit('check-change', val, store.states._data.value[rowIndex], store.getCheckedRows());
        },
      });
    },
  },
  index: {
    renderHeader(column: Column): VNode {
      return h('span', { class: 'title' }, column.header ?? '#');
    },
    renderCell(rowData: DefaultRow, column: Column, store: TableStore, rowIndex: number): number {
      return rowIndex + 1;
    },
  },
  expand: {
    renderHeader(): VNode {
      return <span></span>;
    },
    renderCell(rowData: DefaultRow, column: Column, store: TableStore, rowIndex: number): VNode {
      return (
        <Icon
          name="chevron-right"
          class="icon-expand-row"
          onClick={() => {
            store.toggleRowExpansion(rowData);
          }}></Icon>
      );
    },
  },
  default: {
    renderHeader(column: Column): VNode {
      return h('span', { class: 'title' }, column.header ?? '');
    },
    renderCell(rowData: DefaultRow, column: Column, store: TableStore, rowIndex: number, props: TableProps): VNode {
      const value = column.field ? rowData[column.field] : '';
      let columnValue: VNode;
      if (column.formatter) {
        columnValue = column.formatter(rowData, column, value, rowIndex);
      }
      columnValue = value?.toString?.() ?? '';
      const level = store.states.rowLevelMap.value[getRowIdentity(rowData, props.rowKey)] || 0;
      const indentDom = h('span', { class: `${ns.e('indent')}`, style: { paddingLeft: `${level * props.indent}px` } }, '');

      const showIndentDom = store.states.firstDefaultColumn.value === column.id && level;
      // 暂不支持展开行(column的type==expand)和树形表格同时使用，展开行优先级高
      const showExpendIconDom =
        store.states.firstDefaultColumn.value === column.id &&
        rowData.children?.length &&
        !store.states.flatColumns.value.some((column2) => column2.type === 'expand');
      const expendIconDom = (
        <Icon
          name="chevron-right"
          class="icon-expand-row"
          onClick={() => {
            store.toggleRowExpansion(rowData);
          }}></Icon>
      );

      const cellDom = [];
      if (showIndentDom) {
        cellDom.push(indentDom);
      }
      if (showExpendIconDom) {
        cellDom.push(expendIconDom);
      }
      cellDom.push(columnValue);

      return h('div', { class: `${ns.e('cell')}` }, cellDom);
    },
  },
};
