import type { PropType, ExtractPropTypes, VNode, Slot, ComponentInternalInstance, SetupContext, Slots, ComputedRef } from 'vue';
import { DefaultRow, TableProps } from '../../table-types';
import { TableStore } from '../../store/store-types';

export type SortMethod<T = unknown> = (a: T, b: T) => boolean;

export type ColumnType = 'checkable' | 'index' | 'expand' | 'editable' | '';

export type SortDirection = 'ASC' | 'DESC' | '';

export type ColumnAlign = 'left' | 'center' | 'right';

export interface FilterConfig {
  name: string;
  value: unknown;
  checked?: boolean;
}

type BaseFormatter<T> = (row: DefaultRow, column: T, cellValue: unknown, rowIndex: number) => VNode;

export interface Column {
  id: string;
  type?: ColumnType;
  field: string;
  width: number | string;
  minWidth: number | string;
  maxWidth: number | string;
  realWidth?: number | string;
  header?: string;
  order?: number;
  sortable?: boolean;
  sortDirection?: SortDirection;
  filterable?: boolean;
  filterMultiple?: boolean;
  filterList?: FilterConfig[];
  fixedLeft?: string;
  fixedRight?: string;
  align?: ColumnAlign;
  cellClass: string;
  showOverflowTooltip?: boolean;
  resizeable: boolean;
  ctx?: SetupContext;
  customFilterTemplate?: Slot;
  renderHeader?: (column: Column, store: TableStore) => VNode;
  renderCell?: (
    rowData: DefaultRow,
    columnItem: Column,
    store: TableStore,
    rowIndex: number,
    props?: TableProps,
    cellMode?: ComputedRef<string>,
    ctx?: SetupContext
  ) => VNode;
  formatter?: BaseFormatter<Column>;
  sortMethod?: SortMethod;
  subColumns?: Slot;
  slots: Slots;
}

export type LevelColumn = {
  children?: LevelColumn[];
  level?: number;
  colSpan?: number;
  rowSpan?: number;
  isSubColumn?: boolean;
} & Column;

export type Formatter = BaseFormatter<Column>;

export const tableColumnProps = {
  type: {
    type: String as PropType<ColumnType>,
    default: '',
  },
  header: {
    type: String,
  },
  field: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: '',
  },
  minWidth: {
    type: [String, Number],
    default: '',
  },
  maxWidth: {
    type: [String, Number],
    default: '',
  },
  formatter: {
    type: Function as PropType<Formatter>,
  },
  order: {
    type: Number,
    default: 0,
  },
  sortable: {
    type: Boolean,
    default: false,
  },
  sortDirection: {
    type: String as PropType<SortDirection>,
    default: '',
  },
  sortMethod: {
    type: Function as PropType<SortMethod>,
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  filterMultiple: {
    type: Boolean,
    default: true,
  },
  filterList: {
    type: Array as PropType<FilterConfig[]>,
    default: [],
  },
  fixedLeft: {
    type: String,
  },
  fixedRight: {
    type: String,
  },
  align: {
    type: String as PropType<ColumnAlign>,
    default: 'left',
  },
  showOverflowTooltip: {
    type: Boolean,
    default: false,
  },
  checkable: {
    type: Function as PropType<(row: unknown, rowIndex: number) => boolean>,
  },
  resizeable: {
    type: Boolean,
    default: false,
  },
  reserveCheck: {
    type: Boolean,
    default: false,
  },
  cellClass: {
    type: String,
    default: '',
  },
};

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>;

export interface TableColumn extends ComponentInternalInstance {
  tableId?: string;
  parent: TableColumn;
  columnId: string;
  columnConfig: Partial<Column>;
}
