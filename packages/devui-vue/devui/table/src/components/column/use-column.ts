import { watch, reactive, onBeforeMount, computed, getCurrentInstance, Ref, VNode, SetupContext } from 'vue';
import type { ToRefs, ComputedRef } from 'vue';
import { ITable, DefaultRow, TableProps } from '../../table-types';
import type { Column, TableColumnProps, TableColumn, SortDirection, SortMethod } from './column-types';
import type { TableStore } from '../../store/store-types';
import { formatWidth } from '../../utils';
import { cellMap } from './config';

export function createColumn(id: string, props: ToRefs<TableColumnProps>, ctx: SetupContext): Column {
  const {
    type,
    field,
    header,
    sortable,
    sortDirection,
    width,
    minWidth,
    maxWidth,
    formatter,
    sortMethod,
    filterable,
    filterList,
    filterMultiple,
    order,
    fixedLeft,
    fixedRight,
    align,
    showOverflowTooltip,
    resizeable,
    cellClass,
  } = props;
  const column: Partial<Column> = reactive({ id });
  column.type = type.value;

  function renderHeader(columnItem: Column, store: TableStore) {
    if (ctx.slots.header) {
      return ctx.slots.header(columnItem);
    }
    return cellMap[type.value || 'default'].renderHeader(columnItem, store);
  }

  function renderCell(
    rowData: DefaultRow,
    columnItem: Column,
    store: TableStore,
    rowIndex: number,
    tableProps: TableProps,
    cellMode: string
  ) {
    if (ctx.slots.default && columnItem.type === 'index') {
      return ctx.slots.default({ row: rowData, rowIndex });
    }
    return cellMap[type.value || 'default'].renderCell(rowData, columnItem, store, rowIndex, tableProps, cellMode, ctx);
  }

  watch(
    [field, header, order] as [Ref<string>, Ref<string>, Ref<number>],
    ([fieldVal, headerVal, orderVal]) => {
      column.field = fieldVal;
      column.header = headerVal;
      column.order = orderVal;
    },
    { immediate: true }
  );

  // 排序功能
  watch(
    [sortable, sortDirection, sortMethod] as [Ref<boolean>, Ref<SortDirection>, Ref<SortMethod>],
    ([sortableVal, sortDirectionVal, sortMethodVal]) => {
      column.sortable = sortableVal;
      column.sortDirection = sortDirectionVal;
      column.sortMethod = sortMethodVal;
    },
    { immediate: true }
  );

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
    [fixedLeft, fixedRight] as Ref<string>[],
    ([left, right]) => {
      column.fixedLeft = left;
      column.fixedRight = right;
    },
    { immediate: true }
  );

  watch(
    align,
    (alignVal) => {
      column.align = alignVal;
    },
    { immediate: true }
  );

  watch(
    cellClass,
    (cellClassVal) => {
      column.cellClass = cellClassVal;
    },
    { immediate: true }
  );

  watch(
    showOverflowTooltip,
    (showVal) => {
      column.showOverflowTooltip = showVal;
    },
    { immediate: true }
  );

  watch(
    resizeable,
    (resizeVal) => {
      column.resizeable = resizeVal;
    },
    { immediate: true }
  );

  // 宽度
  watch(
    [width, minWidth, maxWidth],
    ([widthVal, minWidthVal, maxWidthVal]) => {
      column.width = formatWidth(widthVal);
      column.minWidth = minWidthVal;
      column.maxWidth = maxWidthVal;
      column.realWidth = column.width;
    },
    { immediate: true }
  );

  // 基础渲染功能
  onBeforeMount(() => {
    column.id = id;
    column.renderHeader = renderHeader as () => VNode;
    column.renderCell = renderCell as () => VNode;
    column.formatter = formatter?.value;
    column.customFilterTemplate = ctx.slots.customFilterTemplate;
    column.subColumns = ctx.slots.subColumns;
    column.slots = ctx.slots;
    column.ctx = ctx;
  });

  return column as Column;
}

export function useRender<T>(): {
  columnOrTableParent: ComputedRef<ITable<T> | TableColumn>;
  getColumnIndex: (children: Array<unknown>, child: unknown) => number;
} {
  const instance = getCurrentInstance() as TableColumn;
  const columnOrTableParent = computed(() => {
    let parent = instance?.parent as TableColumn;
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
