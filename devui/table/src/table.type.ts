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
  }
};

export type TablePropsTypes = ExtractPropTypes<typeof TableProps>;

export interface Table<T = Record<string, any>> extends ComponentInternalInstance {
  store: TableStore<T>
  props: TablePropsTypes
}

export const TABLE_TOKEN: InjectionKey<Table> = Symbol();
