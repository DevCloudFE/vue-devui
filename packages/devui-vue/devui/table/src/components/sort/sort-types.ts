import type { ExtractPropTypes, PropType } from 'vue';
import { SortDirection } from '../column/column-types';

export const sortProps = {
  modelValue: {
    type: String as PropType<SortDirection>,
    default: '',
  },
};

export type SortProps = ExtractPropTypes<typeof sortProps>;
