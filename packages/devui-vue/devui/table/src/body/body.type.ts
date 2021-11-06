import { ExtractPropTypes, PropType } from 'vue';
import { TableStore } from '../store';

export const TableBodyProps = {
  store: {
    type: Object as PropType<TableStore>,
    default: {},
  },
};

export type TableBodyPropsTypes = ExtractPropTypes<typeof TableBodyProps>;
