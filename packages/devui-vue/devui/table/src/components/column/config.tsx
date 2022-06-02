import { h } from 'vue';
import type { VNode } from 'vue';
import { DefaultRow } from '../../table-types';
import { Column } from './column-types';
import { TableStore } from '../../store/store-types';
import { Checkbox } from '../../../../checkbox';

export const cellMap = {
  checkable: {
    renderHeader(column: Column, store: TableStore): VNode {
      return h(Checkbox, {
        modelValue: store.states._checkAll.value,
        halfchecked: store.states._halfChecked.value,
        onChange: (val: boolean) => {
          store.states._checkAll.value = val;
          store._table.emit('check-all-change', val);
        },
      });
    },
    renderCell(rowData: DefaultRow, column: Column, store: TableStore, rowIndex: number): VNode {
      return h(Checkbox, {
        modelValue: store.isRowChecked(rowData, rowIndex),
        onChange: (val: boolean) => {
          store.checkRow(val, rowData, rowIndex);
          store._table.emit('check-change', val, store.states._data.value[rowIndex]);
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
  default: {
    renderHeader(column: Column): VNode {
      return h('span', { class: 'title' }, column.header ?? '');
    },
    renderCell(rowData: DefaultRow, column: Column, store: TableStore, rowIndex: number): VNode {
      const value = column.field ? rowData[column.field] : '';
      if (column.formatter) {
        return column.formatter(rowData, column, value, rowIndex);
      }
      return value?.toString?.() ?? '';
    },
  },
};
