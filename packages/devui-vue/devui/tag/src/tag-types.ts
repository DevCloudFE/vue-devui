import type { PropType, ExtractPropTypes } from 'vue'

export type tagType = 'primary' | 'success' | 'warning' | 'danger'

export const tagProps = {
  type: {
    type: String as PropType<tagType>,
    default: ''
  },
  color: {
    type: String as PropType<string>,
    default: ''
  },
  titleContent: {
    type: String as PropType<string>,
    default: ''
  },
  checked: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  deletable: {
    type: Boolean as PropType<boolean>,
    default: false
  }
} as const

export type TagProps = ExtractPropTypes<typeof tagProps>
