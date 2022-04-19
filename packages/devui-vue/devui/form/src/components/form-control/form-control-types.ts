import type { PropType, ExtractPropTypes, ComputedRef } from 'vue';

export type FeedbackStatus = 'success' | 'error' | 'pending';

export const formControlProps = {
  feedbackStatus: {
    type: String as PropType<FeedbackStatus>,
  },
  extraInfo: {
    type: String,
    default: '',
  },
};

export type FormControlProps = ExtractPropTypes<typeof formControlProps>;

export interface UseFormControl {
  controlClasses: ComputedRef<Record<string, boolean>>;
  controlContainerClasses: ComputedRef<Record<string, boolean>>;
}
