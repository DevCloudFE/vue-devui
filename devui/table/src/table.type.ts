import { PropType, ExtractPropTypes, ComponentInternalInstance } from 'vue';

export const TableProps = {
  data: {
    type: Array as PropType<any[]>,
    default: [],
  },
  striped: {
    type: Boolean,
    default: false,
  },
  headerBg:{
    type: Boolean,
    default: false
  },
  tableLayout:{
    type: String as PropType<'fixed' | 'auto'>,
    default: 'fixed'
  }
};

export type TablePropsTypes = ExtractPropTypes<typeof TableProps>;

export interface Table extends ComponentInternalInstance {
  store: any
}
