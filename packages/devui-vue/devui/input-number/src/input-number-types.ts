import type { PropType, ExtractPropTypes, ComputedRef, Ref } from 'vue';

export type ISize = 'lg' | 'md' | 'sm';

export const inputNumberProps = {
  placeholder: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  step: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  min: {
    type: Number,
    default: -Infinity,
  },
  size: {
    type: String as PropType<ISize>,
    default: '',
  },
  modelValue: {
    type: Number,
    default: 0,
  },
} as const;

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>;

export interface UseRender {
  isFocus: Ref<boolean>;
  wrapClass: ComputedRef<Record<string, boolean>>;
  controlButtonClass: ComputedRef<Record<string, boolean>>;
  inputWrapClass: string;
  inputInnerClass: ComputedRef<Record<string, boolean>>;
}

export interface UseEvent {
  inputVal: Ref<number>;
  onAdd: () => void;
  onSubtract: () => void;
  onInput: (val: Event) => void;
  onFocus: (event: Event) => void;
  onBlur: (event: Event) => void;
  onChange: (event: Event) => void;
  onKeydown: (event: KeyboardEvent) => void;
}
