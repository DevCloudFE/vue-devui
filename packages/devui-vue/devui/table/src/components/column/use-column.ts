import { watch, reactive, onBeforeMount, computed, h, getCurrentInstance } from 'vue';
import type { ToRefs, Slots, ComputedRef } from 'vue';
import { Table, DefaultRow } from '../../table-types';
import { Column, TableColumnProps, TableColumn } from './column-types';
import { TableStore } from '../../store/store-types';
import { formatWidth, formatMinWidth } from '../../utils';
import { cellMap } from './config';

export function createColumn(props: ToRefs<TableColumnProps>, templates: Slots): Column {
  const {
    type,
    field,
    header,
    sortable,
    width,
    minWidth,
    formatter,
    compareFn,
    filterable,
    filterList,
    filterMultiple,
    order,
    fixedLeft,
    fixedRight,
  } = props;
  const column: Column = reactive({});
  column.type = type.value;

  function defaultRenderHeader(columnItem: Column) {
    return h('span', { class: 'title' }, columnItem.header ?? '');
  }

  function defaultRenderCell(rowData: DefaultRow, columnItem: Column, store: TableStore, rowIndex: number) {
    const value = columnItem.field ? rowData[columnItem.field] : '';
    if (templates.default) {
      return templates.default(rowData);
    }
    if (columnItem.formatter) {
      return columnItem.formatter(rowData, columnItem, value, rowIndex);
    }

    return value?.toString?.() ?? '';
  }

  watch(
    [field, header, order],
    ([fieldVal, headerVal, orderVal]) => {
      column.field = fieldVal;
      column.header = headerVal;
      column.order = orderVal;
    },
    { immediate: true }
  );

  // 排序功能
  watch([sortable, compareFn], ([sortableVal, compareFnVal]) => {
    column.sortable = sortableVal;
    column.compareFn = compareFnVal;
  });

  // 过滤功能
  watch(
    [filterable, filterList, filterMultiple],
    ([filterableVal, filterListVal, filterMultipleVal]) => {
      column.filterable = filterableVal;
      column.filterMultiple = filterMultipleVal;
      column.filterList = filterListVal;
    },
    { immediate: true }
  );

  // 固定左右功能
  watch(
    [fixedLeft, fixedRight],
    ([left, right]) => {
      column.fixedLeft = left;
      column.fixedRight = right;
    },
    { immediate: true }
  );

  // 宽度
  watch([width, minWidth], ([widthVal, minWidthVal]) => {
    column.width = formatWidth(widthVal);
    column.minWidth = formatMinWidth(minWidthVal);
    column.realWidth = column.width || column.minWidth;
  });

  // 基础渲染功能
  onBeforeMount(() => {
    column.renderHeader = type.value ? cellMap[type.value].renderHeader : defaultRenderHeader;
    column.renderCell = type.value ? cellMap[type.value].renderCell : defaultRenderCell;
    column.formatter = formatter?.value;
    column.customFilterTemplate = templates.customFilterTemplate;
    column.subColumns = templates.subColumns;
  });

  return column;
}

export function useRender<T>(): {
  columnOrTableParent: ComputedRef<Table<T> | TableColumn>;
  getColumnIndex: (children: Array<unknown>, child: unknown) => number;
} {
  const instance = getCurrentInstance() as TableColumn;
  const columnOrTableParent = computed(() => {
    let parent: any = instance?.parent;
    while (parent && !parent.tableId && !parent.columnId) {
      parent = parent.parent;
    }
    return parent;
  });
  const getColumnIndex = (children: Array<unknown>, child: unknown) => {
    return Array.prototype.indexOf.call(children, child);
  };

  return { columnOrTableParent, getColumnIndex };
}
