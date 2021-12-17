import type { PropType, ExtractPropTypes } from 'vue'
export const colorPickerProps = {
  modelValue: {
    type: [Object, String] as PropType<string | number>
  },
  mode: {
    type: String
  },
  showAlpha: {
    type: Boolean,
    default: true
  },
  dotSize: {
    type: Number,
    default: 12
  },
  swatches: {
    type: Array as PropType<string[]>
  }
} as const

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
