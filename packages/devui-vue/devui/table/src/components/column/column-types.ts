import type { PropType, ExtractPropTypes, VNode, Slot, ComponentInternalInstance } from 'vue';
import { DefaultRow } from '../../table-types';
import { TableStore } from '../../store/store-types';

// eslint-disable-next-line no-use-before-define
export type Formatter = (row: DefaultRow, column: Column, cellValue: any, rowIndex: number) => VNode[];

export type CompareFn<T = any> = (field: string, a: T, b: T) => boolean;

export type ColumnType = 'checkable' | '';

export interface FilterConfig {
  id: number | string;
  name: string;
  value: any;
  checked?: boolean;
}

export const tableColumnProps = {
  type: {
    type: String as PropType<ColumnType>,
    default: '',
  },
  header: {
    type: String,
    default: '',
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
    default: 80,
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
  compareFn: {
    type: Function as PropType<CompareFn>,
    default: (field: string, a: any, b: any): boolean => a[field] < b[field],
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  filterMultiple: {
    type: Boolean,
    default: false,
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
};

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>;

export type FilterResults = (string | number)[];

export interface CustomFilterProps {
  value: FilterResults;
  onChange: (value: FilterResults) => void;
}

export type CustomFilterSlot = (props: CustomFilterProps) => VNode[];

export interface Column {
  id?: string;
  type?: ColumnType;
  field?: string;
  width?: number;
  minWidth?: number;
  realWidth?: number;
  header?: string;
  order?: number;
  sortable?: boolean;
  filterable?: boolean;
  filterMultiple?: boolean;
  filterList?: FilterConfig[];
  fixedLeft?: string;
  fixedRight?: string;
  renderHeader?: (column: Column, store: TableStore) => VNode;
  renderCell?: (rowData: DefaultRow, columnItem: Column, store: TableStore, rowIndex: number) => VNode;
  formatter?: Formatter;
  compareFn?: CompareFn;
  customFilterTemplate?: CustomFilterSlot;
  subColumns?: Slot;
}

export interface TableColumn extends ComponentInternalInstance {
  columnId: string;
  columnConfig: Partial<Column>;
}
