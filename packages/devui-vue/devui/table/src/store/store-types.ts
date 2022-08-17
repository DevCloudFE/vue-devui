import type { ComponentInternalInstance, Ref } from 'vue';
import { Column, SortMethod, SortDirection } from '../components/column/column-types';
import { DefaultRow } from '../table-types';

// TableStore 对象
// 主要是为了方便维护 Table 中的各种状态
export interface TableStore<T = Record<string, unknown>> {
  // 具体存储的数据
  states: {
    // 外部数据源
    _data: Ref<T[]>;
    // 展开的行数据
    flatRows: Ref<T[]>;
    // 树形表格中隐藏行的key
    hiddenRowKeys: Ref<string[]>;
    // 树形表格中行的等级
    rowLevelMap: Ref<Record<string, number>>;
    // 列数据
    _columns: Ref<Column[]>;
    // 展开的列数据
    flatColumns: Ref<Column[]>;
    // 勾选状态
    _checkSet: Ref<Set<string>>;
    // 勾选全部的状态
    _checkAll: Ref<boolean>;
    // 勾选了部分的状态
    _halfChecked: Ref<boolean>;
    // 是否固定左侧的状态
    isFixedLeft: Ref<boolean>;
    // table header 组件实例
    thList: ComponentInternalInstance[];
    // 第一个type为''列的id
    firstDefaultColumn: Ref<string>;
    // 单元格状态
    tableCellModeMap: Ref<Map<string, string>>;
  };
  // 插入列
  insertColumn(column: Column, parent: unknown): void;
  // 对列排序
  sortColumn(): void;
  // 移除列
  removeColumn(column: Column): void;
  // 更新列
  updateColumns(): void;
  // 更新行
  updateRows(): void;
  // 获取勾选行
  getCheckedRows(): T[];
  collectTh(th: ComponentInternalInstance): void;
  // 排序数据
  sortData(direction: SortDirection, sortMethod: SortMethod<T> | undefined): void;
  // 特定行数据是否勾选
  isRowChecked(row: T, index: number): boolean;
  // 保存勾选行的信息
  checkRow(toggle: boolean, row: T, index?: number): void;

  // 展开行
  toggleRowExpansion(row: T): void;
  isRowExpanded(row: T): boolean;
  setExpandRows: (rowKeys: string[]) => void;
  // 设置行选中状态
  toggleRowSelection: (row: T) => void;
  // 更新 firstDefaultColumn
  updateFirstDefaultColumn: () => void;
  // 更新单元格状态
  setCellMode: (row: DefaultRow, rowIndex: number, fields: string | string[], cellMode: string) => void;
  // 重置所有单元格状态为只读状态
  resetCellMode: () => void;
  // 触发Table组件上的事件
  emitTableEvent: (eventName: string, ...params: unknown[]) => void;
}

export interface UseExpand {
  isRowExpanded: (row: DefaultRow) => boolean;
  updateExpandRows: () => void;
  setExpandRows: (rowKeys: string[]) => void;
  toggleRowExpansion: (row: DefaultRow, expanded?: boolean) => void;
}

export interface UseEditTableCell {
  tableCellModeMap: Ref<Map<string, string>>;
  setCellMode: (row: DefaultRow, rowIndex: number, fields: string | string[], cellMode: string) => void;
  resetCellMode: () => void;
}
