import type { PropType, ExtractPropTypes, ComponentInternalInstance, InjectionKey, Ref, ComputedRef, CSSProperties, ToRefs } from 'vue';
import { TableStore } from './store/store-types';

export type TableSize = 'sm' | 'md' | 'lg';
export type BorderType = '' | 'bordered' | 'borderless';
export type RowKeyType = string | ((v: Record<string, unknown>, index?: number | undefined) => string);

export type SpanMethod = (data: {
  row: unknown;
  column: unknown;
  rowIndex: number;
  columnIndex: number;
}) => number[] | { rowspan: number; colspan: number };

export const tableProps = {
  data: {
    type: Array as PropType<Record<string, unknown>[]>,
    default: [],
  },
  striped: {
    type: Boolean,
    default: false,
  },
  scrollable: {
    type: Boolean,
    default: false,
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
    },
    default: 'sm',
  },
  rowHoveredHighlight: {
    type: Boolean,
    default: true,
  },
  fixHeader: {
    type: Boolean,
    default: false,
  },
  checkable: {
    type: Boolean,
    default: false,
  },
  tableLayout: {
    type: String as PropType<'fixed' | 'auto'>,
    default: 'fixed',
    validator(v: string): boolean {
      return v === 'fixed' || v === 'auto';
    },
  },
  showLoading: {
    type: Boolean,
    default: false,
  },
  headerBg: {
    type: Boolean,
    default: false,
  },
  spanMethod: {
    type: Function as PropType<SpanMethod>,
  },
  borderType: {
    type: String as PropType<BorderType>,
    default: '',
  },
  empty: {
    type: String,
    default: 'No Data',
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  rowKey: {
    type: [Function as PropType<(v: Record<string, unknown>, index?: number | undefined) => string>, String],
    default: 'id',
  },
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  expandRowKeys: {
    type: Array as PropType<string[]>,
  },
  indent: {
    type: Number,
    default: 16,
  },
  lazy: {
    type: Boolean,
    default: false,
  },
};

export type TableProps = ExtractPropTypes<typeof tableProps>;

export type DefaultRow = TableProps['data'][number];

export interface ITable<T = DefaultRow> extends ComponentInternalInstance {
  store: TableStore<T>;
  props: TableProps;
  tableId: string;
  hiddenColumns: Ref<HTMLElement | null>;
  tableRef: Ref<HTMLElement>;
  updateColumnWidth: () => void;
}

// export interface TableCheckStatusArg {
//   pageAllChecked?: boolean; // 全选
//   pageHalfChecked?: boolean; // 半选
// }

// export interface RowToggleStatusEventArg {
//   rowItem: any; // 行数据
//   open: boolean; // 子表格是否展开
// }

export interface TableMethods<T = Record<string, unknown>> {
  getCheckedRows(): T[];
  // setRowCheckStatus(arg: TableCheckStatusArg): void
  // setTableCheckStatus(arg: RowToggleStatusEventArg): void
  // setRowChildToggleStatus(): void
  // setTableChildrenToggleStatus(): void
  // cancelEditingStatus(): void
}

export const TABLE_TOKEN: InjectionKey<ITable> = Symbol();

export interface UseTable {
  classes: ComputedRef<Record<string, boolean>>;
  styles: ComputedRef<CSSProperties>;
}

export type UseFixedColumn = ToRefs<{ stickyClass: ComputedRef<Record<string, boolean>>; stickyStyle: ComputedRef<CSSProperties> }>;

export interface UseTableLayout {
  tableWidth: Ref;
  updateColumnWidth: () => void;
}


export type ITableInstanceAndDefaultRow = ComponentInternalInstance & ITable<DefaultRow>;
