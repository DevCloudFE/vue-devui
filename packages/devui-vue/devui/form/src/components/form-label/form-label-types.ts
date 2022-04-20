import type { ComputedRef, ExtractPropTypes } from 'vue';

export const formLabelProps = {
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
