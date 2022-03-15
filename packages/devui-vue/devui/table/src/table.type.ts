import { PropType, ExtractPropTypes, ComponentInternalInstance, InjectionKey } from 'vue';
import { TableStore } from './store';

export type TableSize = 'sm' | 'md' | 'lg';

export const TableProps = {
  data: {
    type: Array as PropType<Record<string, any>[]>,
    default: [],
  },
  striped: {
    type: Boolean,
    default: false,
  },
  scrollable: {
    type: Boolean,
    default: false
  },
  maxWidth: {
    type: String,
  },
  maxHeight: {
    type: String,
  },
  tableWidth: {
    type: String,
  },
  tableHeight: {
    type: String,
  },
  size: {
    type: String as PropType<TableSize>,
    validator(value: string): boolean {
      return value === 'sm' || value === 'md' || value === 'lg';
    }
  },
  rowHoveredHighlight: {
    type: Boolean,
    default: true
  },
  fixHeader: {
    type: Boolean,
    default: false
  },
  checkable: {
    type: Boolean,
    default: true
  },
  tableLayout: {
    type: String as PropType<'fixed' | 'auto'>,
    default: 'auto',
    validator(v: string) {
      return v === 'fixed' || v === 'auto';
    }
  },
  showLoading: {
    type: Boolean,
    default: false
  },
  headerBg: {
    type: Boolean,
    default: false
  }
};

export type TablePropsTypes = ExtractPropTypes<typeof TableProps>;

export interface Table<T = Record<string, any>> extends ComponentInternalInstance {
  store: TableStore<T>;
  props: TablePropsTypes;
}

// export interface TableCheckStatusArg {
//   pageAllChecked?: boolean; // 全选
//   pageHalfChecked?: boolean; // 半选
// }

// export interface RowToggleStatusEventArg {
//   rowItem: any; // 行数据
//   open: boolean; // 子表格是否展开
// }

export interface TableMethods<T = Record<string, any>> {
  getCheckedRows(): T[];
  // setRowCheckStatus(arg: TableCheckStatusArg): void
  // setTableCheckStatus(arg: RowToggleStatusEventArg): void
  // setRowChildToggleStatus(): void
  // setTableChildrenToggleStatus(): void
  // cancelEditingStatus(): void
}

export const TABLE_TOKEN: InjectionKey<Table> = Symbol();

export type SortDirection = 'ASC' | 'DESC' | '';
