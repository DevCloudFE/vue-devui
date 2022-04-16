import type { PropType, ExtractPropTypes, ComputedRef } from 'vue';

export const formControlProps = {
  feedbackStatus: {
    type: String as PropType<'success' | 'error' | 'pending' | ''>,
    default: '',
  },
  extraInfo: {
    type: String,
    default: '',
  },
};

export type FormControlProps = ExtractPropTypes<typeof formControlProps>;

export interface UseFormControl {
  controlContainerClasses: ComputedRef<Record<string, boolean>>;
}
