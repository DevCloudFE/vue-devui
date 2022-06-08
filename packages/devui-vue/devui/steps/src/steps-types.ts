import type { ExtractPropTypes, PropType } from 'vue';

export type IStepsDirection = 'horizontal' | 'vertical';

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
  direction: {
    type: String as PropType<IStepsDirection>,
    default: 'horizontal',
  },
} as const;

export type StepsProps = ExtractPropTypes<typeof stepsProps>;
