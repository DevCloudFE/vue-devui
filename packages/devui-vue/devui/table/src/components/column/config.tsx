import { h } from 'vue';
import type { VNode } from 'vue';
import { DefaultRow } from '../../table-types';
import { Column } from './column-types';
import { TableStore } from '../../store/store-types';
import { Checkbox } from '../../../../checkbox';
import { Icon } from '../../../../icon';

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
        modelValue: store.isRowChecked(rowData),
        onChange: (val: boolean) => {
          store.checkRow(val, rowData);
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
  expand: {
    renderHeader(): VNode {
      return <span></span>;
    },
    renderCell(rowData: DefaultRow, column: Column, store: TableStore, rowIndex: number): VNode {
      return <Icon name="chevron-right" class="icon-expand-row" onClick={() => {
        store.toggleRow(rowData);
        store._table.emit('expand-change', rowData, store.getExpandedRows());
      }}></Icon>;
    }
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
