import { ref } from 'vue';
import { Column, TableColumnPropsTypes } from './column.type'
import { formatWidth, formatMinWidth } from '../utils';

export function useRender(props: TableColumnPropsTypes): any {
  const formatedWidth = ref(formatWidth(props.width));
  const formatedMinWidth = ref(formatMinWidth(props.minWidth));
  const setColumnWidth = (column: Column) => {
    column.width = formatedWidth.value;
    column.minWidth = formatedMinWidth.value;
    column.realWidth = column.width || column.minWidth;
    return column;
  };

  const setColumnRender = (column: Column) => {
    column.renderHeader = () => {
      return defaultRenderHeader(column);
    };
    column.renderCell = (data) => {
      return defaultRenderCell(data);
    };
  };

  return { setColumnWidth, setColumnRender };
}

function defaultRenderHeader(column: Column) {
  return column.header;
}

function defaultRenderCell({
  row,
  column,
  $index,
}: {
  row: any
  column: Column
  $index: number
}) {
  const value = row[column.field];
  if (column.formatter) {
    return column.formatter(row, column, value, $index);
  }
  return value?.toString?.() || '';
}