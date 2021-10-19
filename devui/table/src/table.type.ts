import { PropType, ExtractPropTypes, ComponentInternalInstance } from 'vue';

export const TableProps = {
  data: {
    type: Array as PropType<Record<string, any>[]>,
    default: [],
  },
  striped: {
    type: Boolean,
    default: false,
  },
};

export type TablePropsTypes = ExtractPropTypes<typeof TableProps>;

export interface Table extends ComponentInternalInstance {
  store: any
}
