import { computed, inject } from 'vue';
import { TABLE_TOKEN } from '../../table-types';

function getAllColumns(columns: any) {
  const result: any = [];
  columns.forEach((column: any) => {
    if (column.children) {
      result.push(column);
      // eslint-disable-next-line prefer-spread
      result.push.apply(result, getAllColumns(column.children));
    } else {
      result.push(column);
    }
  });

  return result;
}

function convertToRows(originColumns: any) {
  let maxLevel = 1;
  const traverse = (column: any, parent: any) => {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.children) {
      let colSpan = 0;
      column.children.forEach((subColumn: any) => {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach((column: any) => {
    column.level = 1;
    traverse(column, undefined);
  });

  const rows: any = [];
  for (let i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  const allColumns = getAllColumns(originColumns);

  allColumns.forEach((column: any) => {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
      column.children.forEach((col: any) => (col.isSubColumn = true));
    }
    rows[column.level - 1].push(column);
  });

  return rows;
}

export function useHeader() {
  const table = inject(TABLE_TOKEN);
  const headerRows = computed(() => convertToRows(table?.store.states._columns.value));

  return { headerRows };
}
