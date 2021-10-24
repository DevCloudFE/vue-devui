import { ExtractPropTypes } from 'vue';

export const TableHeaderProps = {
  store: {
    type: Object,
    default: {},
  },
};

export type TableHeaderPropsTypes = ExtractPropTypes<typeof TableHeaderProps>;
