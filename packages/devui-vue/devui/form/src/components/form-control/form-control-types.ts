import type { PropType, ExtractPropTypes, ComputedRef } from 'vue';
import type { FormItemContext } from '../form-item/form-item-types';

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

export interface UseFormControlValidate {
  feedbackStatus: ComputedRef<FormItemContext['validateState']>;
  showFeedback: ComputedRef<boolean | undefined>;
  showPopover: ComputedRef<boolean>;
  showMessage: ComputedRef<boolean>;
  errorMessage: ComputedRef<FormItemContext['validateMessage']>;
  popPosition: ComputedRef<FormItemContext['popPosition']>;
}
