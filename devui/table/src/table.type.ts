import { PropType, ExtractPropTypes, ComponentInternalInstance } from 'vue';
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
  size: {
    type: String as PropType<TableSize>,
    validator(value: string): boolean {
      return value === 'sm' || value === 'md' || value === 'lg';
    }
  },
  rowHoveredHighlight: {
    type: Boolean,
    default: true
  }
};

export type TablePropsTypes = ExtractPropTypes<typeof TableProps>;

export interface Table<T = Record<string, any>> extends ComponentInternalInstance {
  store: TableStore<T>
  props: TablePropsTypes
}
