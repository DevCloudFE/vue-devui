import type { PropType, ExtractPropTypes, Ref, ComputedRef, StyleValue } from 'vue';

export type Resize = 'none' | 'vertical' | 'horizontal' | 'both' | 'inherit';
export type TextareaAutoSize = { minRows?: number; maxRows?: number } | boolean;

export const textareaProps = {
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
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  resize: {
    type: String as PropType<Resize>,
    default: 'none',
  },
  autosize: {
    type: [Object, Boolean] as PropType<TextareaAutoSize>,
    default: false,
  },
} as const;

export type TextareaProps = ExtractPropTypes<typeof textareaProps>;

export interface UseTextareaEvent {
  onFocus: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
  onInput: (e: Event) => void;
  onChange: (e: Event) => void;
  onKeydown: (e: KeyboardEvent) => void;
}

export interface UseTextareaRender {
  isFocus: Ref<boolean>;
  wrapClasses: ComputedRef<Record<string, boolean>>;
}

export interface UseTextareaAutosize {
  textareaStyle: ComputedRef<StyleValue>;
  updateTextareaStyle: () => void;
}
