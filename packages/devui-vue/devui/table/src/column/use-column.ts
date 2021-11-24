import { watch, reactive, onBeforeMount, ToRefs, Slots, h } from 'vue';
import { Column, TableColumnPropsTypes } from './column.type'
import { formatWidth, formatMinWidth } from '../utils';


export function createColumn<T extends Record<string, unknown> = any>(
  props: ToRefs<TableColumnPropsTypes>,
  templates: Slots
): Column<T> {
  const {
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
    fixedRight
  } = props;
  const column: Column = reactive({});

  watch([field, header, order], ([field, header, order]) => {
    column.field = field;
    column.header = header;
    column.order = order;
  }, { immediate: true });

  // 排序功能
  watch([sortable, compareFn], ([sortable, compareFn]) => {
    column.sortable = sortable;
    column.compareFn = compareFn;
  })

  // 过滤功能
  watch([
    filterable,
    filterList,
    filterMultiple,
  ], ([filterable, filterList, filterMultiple]) => {
    column.filterable = filterable;
    column.filterMultiple = filterMultiple;
    column.filterList = filterList;
  }, { immediate: true })

  // 固定左右功能
  watch([fixedLeft, fixedRight], ([left, right]) => {
    column.fixedLeft = left;
    column.fixedRight = right;
  }, { immediate: true });

  // 宽度
  watch([width, minWidth], ([width, minWidth]) => {
    column.width = formatWidth(width);
    column.minWidth = formatMinWidth(minWidth);
    column.realWidth = column.width || column.minWidth;
  });

  // 基础渲染功能
  onBeforeMount(() => {
    column.renderHeader = defaultRenderHeader;
    column.renderCell = defaultRenderCell;
    column.formatter = formatter.value;
    column.customFilterTemplate = templates.customFilterTemplate;
    column.subColumns = templates.subColumns;
  });

  return column;
}

function defaultRenderHeader(this: Column) {
  return h('span', { class: 'title' }, this.header);
}

function defaultRenderCell<T extends Record<string, unknown>>(this: Column, rowData: T, index: number) {
  const value = rowData[this.field];
  if (this.formatter) {
    return this.formatter(rowData, value, index);
  }
  return value?.toString?.() ?? '';
}
