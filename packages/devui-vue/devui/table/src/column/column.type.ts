import { PropType, ExtractPropTypes, VNode, Slot } from 'vue';

export const TableColumnProps = {
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
    default: 0
  },
  sortable: {
    type: Boolean,
    default: false
  },
  compareFn: {
    type: Function as PropType<CompareFn>,
    default: (field: string, a: any, b: any): boolean => a[field] < b[field]
  },
  filterable: {
    type: Boolean,
    default: false
  },
  filterMultiple: {
    type: Boolean,
    default: false
  },
  filterList: {
    type: Array as PropType<FilterConfig[]>,
    default: []
  },
  fixedLeft: {
    type: String,
  },
  fixedRight: {
    type: String,
  },
};

export type TableColumnPropsTypes = ExtractPropTypes<typeof TableColumnProps>;

export type Formatter<T = any, R = any> = (row: T, cellValue: R, index: number) => VNode[];

export type CompareFn<T = any> = (field: string, a: T, b: T) => boolean;

export type FilterResults = (string | number)[];

export interface CustomFilterProps {
  value: FilterResults;
  onChange: (value: FilterResults) => void;
}

export type CustomFilterSlot = (props: CustomFilterProps) => VNode[];

export interface FilterConfig {
  id: number | string;
  name: string;
  value: any;
  checked?: boolean;
}
export interface Column<T extends Record<string, unknown> = any> {
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
  renderHeader?: () => void;
  renderCell?: (row: T, index: number) => void;
  formatter?: Formatter<T>;
  compareFn?: CompareFn<T>;
  customFilterTemplate?: CustomFilterSlot;
  subColumns?: Slot;
}
