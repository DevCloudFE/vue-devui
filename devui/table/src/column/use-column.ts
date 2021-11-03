import { ref, watch, reactive, onBeforeMount, computed, ToRefs, Slots } from 'vue';
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
    compareFn
  } = props;
  const column: Column = reactive({});

  watch(
    [field, header, sortable],
    ([field, header, sortable]) => {
      column.field = field;
      column.header = header;
      column.sortable = sortable;
      column.filterable = true;
    },
    { immediate: true }
  );

  onBeforeMount(() => {
    column.width = formatWidth(width.value);
    column.minWidth = formatMinWidth(minWidth.value);
    column.realWidth = column.width || column.minWidth;
    column.renderHeader = defaultRenderHeader;
    column.renderCell = defaultRenderCell;
    column.formatter = formatter.value;
    column.compareFn = compareFn.value;
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