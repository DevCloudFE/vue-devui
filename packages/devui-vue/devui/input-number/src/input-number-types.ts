import type { PropType, ExtractPropTypes, ComputedRef, Ref, CSSProperties, InputHTMLAttributes } from 'vue';

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
    default: 1,
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
    type: String as PropType<ISize>
  },
  modelValue: {
    type: Number,
  },
  precision: {
    type: Number,
  },
  reg: {
    type: [RegExp, String] as PropType<RegExp | string>,
    default: '',
  },
} as const;

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>;

export interface IState {
  currentValue: number | string | undefined;
  userInputValue: number | string | undefined;
}

export interface UseExpose {
  inputRef: Ref<HTMLElement>;
}

export interface UseRender {
  wrapClass: ComputedRef<unknown[]>;
  customStyle: { style: CSSProperties };
  otherAttrs: InputHTMLAttributes;
  controlButtonsClass: ComputedRef<Record<string, boolean>>;
  inputWrapClass: ComputedRef<Record<string, boolean>>;
  inputInnerClass: ComputedRef<Record<string, boolean>>;
}

export interface UseEvent {
  inputVal: ComputedRef<number | string | undefined>;
  minDisabled: ComputedRef<boolean>;
  maxDisabled: ComputedRef<boolean>;
  onAdd: () => void;
  onSubtract: () => void;
  onInput: (val: Event) => void;
  onChange: (event: Event) => void;
}
