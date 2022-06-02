import type { PropType, ExtractPropTypes } from 'vue';

export const stepProps = {
  title: {
    type: String,
    required: true,
  },
} as const;

export type StepProps = ExtractPropTypes<typeof stepProps>;
