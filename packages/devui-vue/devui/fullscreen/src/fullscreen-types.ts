import type { PropType, ExtractPropTypes } from 'vue';

export type ModeType = 'immersive' | 'normal';
export const fullscreenProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String as PropType<ModeType>,
    default: 'normal'
  },
  zIndex: {
    type: Number,
    default: 10
  },
} as const;

export type FullscreenProps = ExtractPropTypes<typeof fullscreenProps>;
