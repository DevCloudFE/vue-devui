import { ExtractPropTypes, PropType } from 'vue';
import { TableStore } from '../store';

export const TableHeaderProps = {
  store: {
    type: Object as PropType<TableStore>,
    default: {},
  },
};

export type TableHeaderPropsTypes = ExtractPropTypes<typeof TableHeaderProps>;
