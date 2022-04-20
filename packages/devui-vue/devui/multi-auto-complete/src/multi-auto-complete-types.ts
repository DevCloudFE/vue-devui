import type { PropType, ExtractPropTypes } from 'vue';

export const multiAutoCompleteProps = {
  // data: {
  //   type: type,
  //   default: defaultValue
  // },
} as const;

export type MultiAutoCompleteProps = ExtractPropTypes<typeof multiAutoCompleteProps>;
