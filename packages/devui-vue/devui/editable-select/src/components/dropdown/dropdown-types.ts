import type { PropType, ExtractPropTypes } from 'vue';
import { Options } from '../../editable-select-types';

export const dropdownProps = {
  options: {
    type: Array as PropType<Options>,
    default: () => [],
  },
  width: {
    type: Number,
  },
  maxHeight: {
    type: Number,
  },
} as const;

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>;
