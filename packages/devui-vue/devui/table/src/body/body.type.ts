import { ExtractPropTypes } from 'vue';

export const TableBodyProps = {
  store: {
    type: Object,
    default: {},
  },
};

export type TableBodyPropsTypes = ExtractPropTypes<typeof TableBodyProps>;
