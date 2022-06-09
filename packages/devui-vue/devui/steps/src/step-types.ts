import type { PropType, ExtractPropTypes } from 'vue';

export type IStepStatus = 'wait' | 'process' | 'finish' | 'success' | 'error';

export const stepProps = {
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
  },
  status: {
    type: String as PropType<IStepStatus>,
  },
} as const;

export type StepProps = ExtractPropTypes<typeof stepProps>;
