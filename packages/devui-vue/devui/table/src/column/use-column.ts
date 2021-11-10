import { watch, reactive, onBeforeMount, ToRefs, Slots } from 'vue';
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
    filterMultiple
  } = props;
  const column: Column = reactive({});

  watch([field, header], ([field, header]) => {
    column.field = field;
    column.header = header;
  }, { immediate: true });

  watch([sortable, compareFn], ([sortable, compareFn]) => {
    column.sortable = sortable;
    column.compareFn = compareFn;
  })

  watch([
    filterable,
    filterList,
    filterMultiple,
  ], ([filterable, filterList, filterMultiple]) => {
    column.filterable = filterable;
    column.filterMultiple = filterMultiple;
    column.filterList = filterList;
  }, { immediate: true })


  onBeforeMount(() => {
    column.width = formatWidth(width.value);
    column.minWidth = formatMinWidth(minWidth.value);
    column.realWidth = column.width || column.minWidth;
    column.renderHeader = defaultRenderHeader;
    column.renderCell = defaultRenderCell;
    column.formatter = formatter.value;
    column.customFilterTemplate = templates.customFilterTemplate;
  });

  return column;
}

function defaultRenderHeader(this: Column) {
  return this.header;
}

function defaultRenderCell<T extends Record<string, unknown>>(this: Column, rowData: T, index: number) {
  const value = rowData[this.field];
  if (this.formatter) {
    return this.formatter(rowData, value, index);
  }
  return value?.toString?.() ?? '';
}