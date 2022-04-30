import type { PropType, ExtractPropTypes } from 'vue';

export type Resize = 'none' | 'vertical' | 'horizontal' | 'both' | 'inherit';

export const textareaProps = {
  id: {
    type: String,
    default: undefined,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  showCount: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  value: {
    type: String,
    default: '',
  },
  maxLength: {
    type: [String, Number] as PropType<number | string>,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  cssClass: {
    type: String,
    default: '',
  },
  resize: {
    type: String as PropType<Resize>,
    default: 'none',
  },
} as const;

export type TextareaProps = ExtractPropTypes<typeof textareaProps>;
