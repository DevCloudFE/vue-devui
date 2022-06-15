import { isBoolean } from '../../shared/utils';
import { DefaultRow } from './table-types';

export function formatWidth(width: number | string): number | string {
  if (width === '') {
    return width;
  }
  if (typeof width === 'number') {
    return width;
  }

  return parseInt(width, 10) || 80;
}

export function getRowIdentity(row: DefaultRow, rowKey: string): string {
  const paths = rowKey.split('.');
  let obj = row;

  for (const p of paths) {
    obj = obj[p];
  }
  return `${obj}`;
}

export function getRowKeysMap(data: DefaultRow[], rowKey: string): Record<string, { row: DefaultRow; index: number }> {
  const rowKeyMap: Record<string, any> = {};
  (data || []).forEach((row: DefaultRow, index: number) => {
    rowKeyMap[getRowIdentity(row, rowKey)] = { row, index };
  });
  return rowKeyMap;
}

export function toggleRowExpandStatus(rowsArr: DefaultRow[], row: DefaultRow, status?: boolean): boolean {
  let isChanged = false;
  const index = rowsArr.indexOf(row);
  const isIncluded = index !== -1;

  const addRow = () => {
    rowsArr.push(row);
    isChanged = true;
  };
  const deleteRow = () => {
    rowsArr.splice(index, 1);
    isChanged = true;
  };

  if (isBoolean(status)) {
    if (status && !isIncluded) {
      addRow();
    } else if (!status && isIncluded) {
      deleteRow();
    }
  } else {
    if (isIncluded) {
      deleteRow();
    } else {
      addRow();
    }
  }

  return isChanged;
}
