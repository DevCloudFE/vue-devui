import { h, SetupContext, ComputedRef } from 'vue';
import type { VNode } from 'vue';
import { DefaultRow, TableProps } from '../../table-types';
import { Column, LevelColumn } from './column-types';
import { TableStore } from '../../store/store-types';
import { Checkbox } from '../../../../checkbox';
import { Icon } from '../../../../icon';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { getRowIdentity } from '../../utils';
import './column.scss';
import { IconOpen } from '../../../../tree/src/components/icon-open';
import { IconClose } from '../../../../tree/src/components/icon-close';

const ns = useNamespace('table');

export const cellMap = {
  checkable: {
    renderHeader(column: Column, store: TableStore): VNode {
      return h(Checkbox, {
        modelValue: store.states._checkAll.value,
        halfChecked: store.states._halfChecked.value,
        onChange: (val: boolean) => {
          store.states._checkAll.value = val;
          store.emitTableEvent('check-all-change', val, store.getCheckedRows());
        },
      });
    },
    renderCell(rowData: DefaultRow, column: Column, store: TableStore, rowIndex: number): VNode {
      return h(Checkbox, {
        modelValue: store.isRowChecked(rowData, rowIndex),
        onChange: (val: boolean) => {
          store.checkRow(val, rowData, rowIndex);
          store.emitTableEvent('check-change', val, store.states._data.value[rowIndex], store.getCheckedRows());
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
    renderCell(rowData: DefaultRow, column: Column, store: TableStore): VNode {
      return (
        <Icon
          name="chevron-right"
          class="icon-expand-row"
          onClick={() => {
            store.toggleRowExpansion(rowData);
          }}
        />
      );
    },
  },
  editable: {
    renderHeader(column: Column): VNode {
      return h('span', { class: 'title' }, column.header ?? '');
    },
    renderCell(
      rowData: DefaultRow,
      column: Column,
      store: TableStore,
      rowIndex: number,
      props: TableProps,
      cellMode: ComputedRef<string>,
      ctx: SetupContext
    ): VNode {
      let columnValue: VNode[] | VNode | string;
      if (cellMode.value === 'edit') {
        columnValue = ctx.slots.cellEdit ? ctx.slots.cellEdit({ row: rowData, rowIndex }) : '';
      } else {
        if (ctx.slots.cell) {
          columnValue = <div class="cell-text">{ctx.slots.cell({ row: rowData, rowIndex })}</div>;
        } else {
          const value = (column.field ? rowData[column.field] : '') as string;
          if (column.formatter) {
            columnValue = column.formatter(rowData, column, value, rowIndex);
          }
          columnValue = <div class="cell-text">{value?.toString?.() ?? ''}</div>;
        }
      }
      return h(
        'div',
        { class: [ns.e('cell'), column.type === 'editable' && cellMode?.value === 'readonly' && 'editable-cell'] },
        columnValue
      );
    },
  },
  default: {
    renderHeader(column: Column): VNode {
      return h('span', { class: 'title' }, column.header ?? '');
    },
    renderCell(
      rowData: DefaultRow,
      column: Column,
      store: TableStore,
      rowIndex: number,
      props: TableProps,
      cellMode: ComputedRef<string>,
      ctx: SetupContext
    ): VNode {
      let columnValue: VNode[] | VNode | string;
      if (ctx.slots.default) {
        columnValue = ctx.slots.default({ row: rowData, rowIndex });
      } else {
        const value = (column.field ? rowData[column.field] : '') as string;
        if (column.formatter) {
          columnValue = column.formatter(rowData, column, value, rowIndex);
        }
        columnValue = value?.toString?.() ?? '';
      }

      const hasExpandColumn = store.states.flatColumns.value.some((column2) => column2.type === 'expand');
      const hasChildren = store.states._data.value.some((row) => (row as unknown as LevelColumn).children?.length);

      const level = store.states.rowLevelMap.value[getRowIdentity(rowData, props.rowKey)] || 0;
      const indentDom = h('span', { class: `${ns.e('indent')}`, style: { paddingLeft: `${level * props.indent}px` } }, '');

      const isTreeCell = store.states.firstDefaultColumn.value === column.id;
      const showIndentDom = isTreeCell && level;

      const showExpendIconDom = isTreeCell && (rowData as unknown as LevelColumn).children?.length;
      const expendIconDom = (
        <span
          class={ns.e('tree-operate')}
          onClick={() => {
            store.toggleRowExpansion(rowData);
          }}
          style={showExpendIconDom ? '' : 'visibility: hidden;'}>
          {store.isRowExpanded(rowData) ? <IconOpen /> : <IconClose />}
        </span>
      );

      const cellDom = [];
      if (showIndentDom) {
        cellDom.push(indentDom);
      }
      // 暂不支持展开行(column的type==expand)和树形表格同时使用，展开行优先级高
      if (hasChildren && !hasExpandColumn && isTreeCell) {
        cellDom.push(expendIconDom);
      }

      cellDom.push(columnValue);

      return h('div', { class: `${ns.e('cell')} ` }, cellDom);
    },
  },
};
