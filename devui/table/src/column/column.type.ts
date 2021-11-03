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

};

export type TableColumnPropsTypes = ExtractPropTypes<typeof TableColumnProps>;

export type Formatter<T = any, R = any> = (row: T, cellValue: R, index: number) => VNode;

export interface Column<T extends Record<string, unknown> = any> {
  field?: string
  width?: number
  minWidth?: number
  realWidth?: number
  header?: string
  sortable?: boolean
  renderHeader?: () => void
  renderCell?: (row: T, index: number) => void
  formatter?: Formatter<T>
}