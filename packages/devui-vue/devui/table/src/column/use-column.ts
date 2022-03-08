import { watch, reactive, onBeforeMount, ToRefs, Slots, h } from 'vue';
import { Column, TableColumnPropsTypes } from './column.type';
import { formatWidth, formatMinWidth } from '../utils';

function defaultRenderHeader(this: Column) {
  return h('span', { class: 'title' }, this.header);
}

export function createColumn<T extends Record<string, unknown> = any>(props: ToRefs<TableColumnPropsTypes>, templates: Slots): Column<T> {
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
    fixedRight,
  } = props;
  const column: Column = reactive({});

  function defaultRenderCell<K extends Record<string, unknown>>(rowData: K, index: number) {
    const value = rowData[this.field];
    if (templates.default) {
      return templates.default(rowData);
    }
    if (this.formatter) {
      return this.formatter(rowData, value, index);
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
    column.renderHeader = defaultRenderHeader;
    column.renderCell = defaultRenderCell;
    column.formatter = formatter.value;
    column.customFilterTemplate = templates.customFilterTemplate;
    column.subColumns = templates.subColumns;
  });

  return column;
}
