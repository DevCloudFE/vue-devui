import { computed, inject } from 'vue';
import type { ComputedRef } from 'vue';
import { TABLE_TOKEN, ITableInstanceAndDefaultRow } from '../../table-types';
import { LevelColumn } from '../../components/column/column-types';

function getAllColumns(columns: LevelColumn[]) {
  const result: LevelColumn[] = [];
  columns.forEach((column) => {
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

function convertToRows(originColumns: LevelColumn[]) {
  let maxLevel = 1;
  const traverse = (column: LevelColumn, parent?: LevelColumn) => {
    if (parent) {
      column.level = (parent.level as number) + 1;
      if (maxLevel < (column.level as number)) {
        maxLevel = column.level as number;
      }
    }
    if (column.children) {
      let colSpan = 0;
      column.children.forEach((subColumn) => {
        traverse(subColumn, column);
        colSpan += (subColumn.colSpan || 0);
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach((column: LevelColumn) => {
    column.level = 1;
    traverse(column, undefined);
  });

  const rows: LevelColumn[][] = [];
  for (let i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  const allColumns = getAllColumns(originColumns);

  allColumns.forEach((column: LevelColumn) => {
    if (!column.children) {
      column.rowSpan = maxLevel - (column.level || 0) + 1;
    } else {
      column.rowSpan = 1;
      column.children.forEach((col) => (col.isSubColumn = true));
    }
    rows[(column.level as number) - 1].push(column);
  });

  return rows;
}

export function useHeader(): { headerRows: ComputedRef<LevelColumn[][]> } {
  const table = inject(TABLE_TOKEN) as ITableInstanceAndDefaultRow;
  const headerRows = computed(() => convertToRows(table?.store.states._columns.value as LevelColumn[]));

  return { headerRows };
}
