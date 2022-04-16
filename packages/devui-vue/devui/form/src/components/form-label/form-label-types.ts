import type { ComputedRef, ExtractPropTypes } from 'vue';

export const formLabelProps = {
  required: {
    type: Boolean,
    default: false,
  },
  hasHelp: {
    type: Boolean,
    default: false,
  },
  helpTips: {
    type: String,
    default: '',
  },
};

export type FormLabelProps = ExtractPropTypes<typeof formLabelProps>;

export interface UseFormLabel {
  labelClasses: ComputedRef<Record<string, boolean>>;
  labelInnerClasses: ComputedRef<Record<string, boolean>>;
}
