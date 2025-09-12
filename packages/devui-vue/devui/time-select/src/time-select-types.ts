import { PropType, Ref, ExtractPropTypes, ComputedRef } from 'vue';
type Size = 'lg' | 'md' | 'sm';

export const timeSelectProps = {
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  start: {
    type: String,
    default: '00:00',
  },
  end: {
    type: String,
    default: '24:00',
  },
  step: {
    type: String,
    default: '00:30',
  },
  minTime: {
    type: String,
    default: '-1:-1',
  },
  maxTime: {
    type: String,
    default: '24:00',
  },
  placeholder: {
    type: String,
    default: '',
  },
  size: {
    type: String as PropType<Size>
  },
  'onUpdate:modelValue': {
    type: Function as PropType<(v: boolean) => void>,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
} as const;

export type TimeSelectProps = ExtractPropTypes<typeof timeSelectProps>;

export interface TimeListType {
  value: string;
  name: string;
  [key: string]: unknown;
}

export type useTimeSelectFn = {
  changeData: (data: TimeListType) => void;
  options: ComputedRef<TimeListType[]>;
  select: Ref<HTMLElement | undefined>;
  clearData: (value: string) => void;
  focusFun: (e: FocusEvent) => void;
  blurFun: (e: FocusEvent) => void;
};

export interface Time {
  hour: number;
  minute: number;
}
