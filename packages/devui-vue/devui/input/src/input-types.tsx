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
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  prefix: {
    type: String,
    default: '',
  },
  suffix: {
    type: String,
    default: '',
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  showGlowStyle: {
    type: Boolean,
    default: true,
  },
} as const;

export type InputProps = ExtractPropTypes<typeof inputProps>;

export interface UseInputRender {
  inputDisabled: ComputedRef<boolean>;
  inputSize: ComputedRef<InputSize | ''>;
  isFocus: Ref<boolean>;
  wrapClasses: ComputedRef<Record<string, boolean | undefined>>;
  inputClasses: ComputedRef<Record<string, boolean | undefined>>;
  customStyle: Record<string, unknown>;
  otherAttrs: Record<string, unknown>;
}

export interface UseInputEvent {
  onFocus: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
  onInput: (e: Event) => void;
  onChange: (e: Event) => void;
  onKeydown: (e: KeyboardEvent) => void;
  onClear: () => void;
}

export interface UseInputFunction {
  select: () => void;
  blur: () => void;
  focus: () => void;
}
