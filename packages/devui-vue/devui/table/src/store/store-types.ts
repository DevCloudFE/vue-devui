import type { ComponentInternalInstance, Ref } from 'vue';
import { Column, SortMethod, SortDirection } from '../components/column/column-types';
import { DefaultRow, ITable } from '../table-types';

// TableStore 对象
// 主要是为了方便维护 Table 中的各种状态
export interface TableStore<T = Record<string, any>> {
  // 内置 table 对象
  _table: ITable<DefaultRow>;
  // 具体存储的数据
  states: {
    // 外部数据源
    _data: Ref<T[]>;
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
  };
  // 插入列
  insertColumn(column: Column, parent: any): void;
  // 对列排序
  sortColumn(): void;
  // 移除列
  removeColumn(column: Column): void;
  // 更新列
  updateColumns(): void;
  // 获取勾选行
  getCheckedRows(): T[];
  // 排序数据
  sortData(direction: SortDirection, sortMethod: SortMethod<T>): void;
  // 特定行数据是否勾选
  isRowChecked(row: T, index: number): boolean;
  // 保存勾选行的信息
  checkRow(toggle: boolean, row: T, index: number): void;

  // 展开行
  toggleRowExpansion(row: T): void;
  isRowExpanded(row: T): boolean;
  setExpandRows: (rowKeys: string[]) => void;
  // 设置行选中状态
  toggleRowSelection: (row: T) => void;
}

export interface UseExpand {
  isRowExpanded: (row: DefaultRow) => boolean;
  updateExpandRows: () => void;
  setExpandRows: (rowKeys: string[]) => void;
  toggleRowExpansion: (row: DefaultRow, expanded?: boolean) => void;
}
