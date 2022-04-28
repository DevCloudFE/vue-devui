import type { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue';

export type InputSize = 'sm' | 'md' | 'lg';

export const inputProps = {
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
  size: {
    type: String as PropType<InputSize>,
    default: 'md',
  },
} as const;

export type InputProps = ExtractPropTypes<typeof inputProps>;

export interface UseInputRender {
  isFocus: Ref<boolean>;
  wrapClasses: ComputedRef<Record<string, boolean>>;
}

export interface UseInputEvent {
  onFocus: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
  onInput: (e: Event) => void;
  onChange: (e: Event) => void;
  onKeydown: (e: KeyboardEvent) => void;
}
