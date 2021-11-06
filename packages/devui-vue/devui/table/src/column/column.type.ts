import { PropType, ExtractPropTypes, VNode } from 'vue';

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
  sortable: {
    type: Boolean,
    default: false
  },
  compareFn: {
    type: Function as PropType<CompareFn>,
    default: (field: string, a: any, b: any) => a[field] < b[field]
  }
};

export type TableColumnPropsTypes = ExtractPropTypes<typeof TableColumnProps>;

export type Formatter<T = any, R = any> = (row: T, cellValue: R, index: number) => VNode[];

export type CompareFn<T = any> = (field: string, a: T, b: T) => boolean;

export type FilterList = (string | number)[];

export interface CustomFilterProps {
  value: FilterList;
  onChange: (value: FilterList) => void;
}

export type CustomFilterSlot = (props: CustomFilterProps) => VNode[];

export interface Column<T extends Record<string, unknown> = any> {
  field?: string
  width?: number
  minWidth?: number
  realWidth?: number
  header?: string
  sortable?: boolean
  filterable?: boolean
  renderHeader?: () => void
  renderCell?: (row: T, index: number) => void
  formatter?: Formatter<T>
  compareFn?: CompareFn<T>
  customFilterTemplate?: CustomFilterSlot;
}