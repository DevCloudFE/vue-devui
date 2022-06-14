import type { ExtractPropTypes, PropType, Ref } from 'vue';
export const sliderProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
  max: {
    type: Number,
    default: 100,
  },
  min: {
    type: Number,
    default: 0,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  step: {
    type: Number,
    default: 1,
  },
  tipsRenderer: {
    type: [Function, null] as PropType<(val: number) => string | null>,
    default: () => (value: number) => `${value}`,
  },
} as const;

export type SliderProps = ExtractPropTypes<typeof sliderProps>;

export interface UseSliderEvent {
  sliderRunway: Ref<HTMLDivElement | undefined>;
  popoverShow: Ref<boolean>;
  percentDisplay: Ref<string>;
  currentValue: Ref<number>;
  handleRunwayMousedown: (e: MouseEvent) => void;
  handleButtonMousedown: (e: MouseEvent) => void;
}
