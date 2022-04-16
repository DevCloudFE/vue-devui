import type { ComputedRef, ExtractPropTypes } from 'vue';

export const formItemProps = {
  field: {
    type: String,
    default: '',
  },
  dHasFeedback: {
    type: Boolean,
    default: false,
  },
};

export type FormItemProps = ExtractPropTypes<typeof formItemProps>;

export interface UseFormItem {
  itemClasses: ComputedRef<Record<string, boolean>>;
  tipClasses: ComputedRef<Record<string, boolean>>;
}
