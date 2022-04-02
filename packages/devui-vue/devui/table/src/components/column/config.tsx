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
        },
      });
    },
    renderCell(rowData: DefaultRow, column: Column, store: TableStore, rowIndex: number): VNode {
      return h(Checkbox, {
        modelValue: store.states._checkList.value[rowIndex],
        onChange: (val: boolean) => {
          store.states._checkList.value[rowIndex] = val;
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
};
