import type { PropType, ExtractPropTypes } from 'vue';

export const stepsProps = {
  // data: {
  //   type: type,
  //   default: defaultValue
  // },
} as const;

export type StepsProps = ExtractPropTypes<typeof stepsProps>;
