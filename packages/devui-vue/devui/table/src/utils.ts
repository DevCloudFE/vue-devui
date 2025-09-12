import { isBoolean, isFunction, isString } from '../../shared/utils';
import { DefaultRow, ITable, RowKeyType } from './table-types';

export function formatWidth(width: number | string): number | string {
  if (width === '') {
    return width;
  }
  if (typeof width === 'number') {
    return width;
  }

  return parseInt(width, 10) || 80;
}

export function getRowIdentity(row: DefaultRow, rowKey: RowKeyType, index?: number): string {
  if (isFunction(rowKey)) {
    return rowKey(row, index) as string;
  } else if (isString(rowKey)) {
    const paths = rowKey.split('.');
    let obj: Record<string, unknown> | string = row;

    for (const p of paths) {
      obj = obj[p];
    }
    return `${obj}`;
  }
  return '';
}

export function getRowKeysMap(data: DefaultRow[], rowKey: RowKeyType): Record<string, { row: DefaultRow; index: number }> {
  const rowKeyMap: Record<string, { row: DefaultRow; index: number }> = {};
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

export function toggleRowVisible(expand: boolean, table: ITable<DefaultRow>, key: string): void {
  const rowLevelMap = table?.store.states.rowLevelMap.value || {};
  const levelKeys = Object.keys(rowLevelMap);
  const hiddenRowKeys = table?.store.states.hiddenRowKeys;
  let start = false;
  for (let index = 0; index < levelKeys.length; index++) {
    if (levelKeys[index] === key) {
      start = true;
      index++;
    }
    if (start && rowLevelMap[levelKeys[index]] !== rowLevelMap[key] + 1) {
      break;
    }
    if (start && rowLevelMap[levelKeys[index]] === rowLevelMap[key] + 1) {
      if (expand) {
        hiddenRowKeys.value = hiddenRowKeys.value.filter((rowKey) => rowKey !== levelKeys[index]);
      } else {
        if (!hiddenRowKeys.value.includes(levelKeys[index])) {
          hiddenRowKeys.value.push(levelKeys[index]);
        }
      }
    }
  }
}
