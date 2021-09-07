import type { PropType, ExtractPropTypes } from 'vue'

export const imagePreviewProps = {
  url: {
    type: String,
    default: ''
  },
  previewUrlList: {
    type: Array as PropType<string[]>,
    default: () => []
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
