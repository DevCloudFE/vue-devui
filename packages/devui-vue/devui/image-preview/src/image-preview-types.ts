import type { PropType, ExtractPropTypes } from 'vue'

export const imagePreviewProps = {
  url: {
    type: String,
    default: '',
    required: true
  },
  previewUrlList: {
    type: Array as PropType<string[]>,
    default: () => [],
    required: true
  },
  zIndex: {
    type: Number,
    required: false
  },
  backDropZIndex: {
    type: Number,
    required: false
  }
} as const

export interface BindingTypes {
  value: {
    custom?: any
    disableDefault?: boolean
    zIndex?: number
    backDropZIndex?: number
  }
  [key: string]: any
}

export type ImagePreviewProps = ExtractPropTypes<typeof imagePreviewProps>
