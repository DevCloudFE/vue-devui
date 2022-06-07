import type { ExtractPropTypes } from 'vue';

export const stepsProps = {
  modelValue: {
    type: Number,
    default: 0,
  },
  space: {
    type: Number,
  },
  alignCenter: {
    type: Boolean,
    default: false,
  },
} as const;

export type StepsProps = ExtractPropTypes<typeof stepsProps>;
