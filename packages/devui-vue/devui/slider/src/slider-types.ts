import type { ExtractPropTypes } from 'vue';
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
    type: String,
    default: '',
  },
} as const;

export type SliderProps = ExtractPropTypes<typeof sliderProps>;
