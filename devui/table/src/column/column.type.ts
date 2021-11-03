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
    type: Function as PropType<
      (row: any, column: Column, cellValue: any, index: number) => VNode
    >,
  },
  sortable: {
    type: Boolean,
    default: false
  },

};

export type TableColumnPropsTypes = ExtractPropTypes<typeof TableColumnProps>;

export interface Column {
  field?: string
  width?: number
  minWidth?: number
  realWidth?: number
  header?: string
  sortable?: boolean
  renderHeader?: () => void
  renderCell?: (data: any) => void
  formatter?: (row: any, column: Column, cellValue, index: number) => VNode
}