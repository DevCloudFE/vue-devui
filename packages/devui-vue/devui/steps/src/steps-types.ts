import type { PropType, ExtractPropTypes } from 'vue';

export const stepsProps = {
  modelValue: {
    type: Number,
    default: 0,
  },
} as const;

export type StepsProps = ExtractPropTypes<typeof stepsProps>;
