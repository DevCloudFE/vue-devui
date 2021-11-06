import type { PropType, ExtractPropTypes } from 'vue'

export type tagType = 'primary' | 'success' | 'warning' | 'danger'

export const tagsProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
  type: {
    type: String as PropType<tagType>,
    default: ''
  },
  color: {
    type: String as PropType<string>,
    default: ''
  }
} as const

export type TagsProps = ExtractPropTypes<typeof tagsProps>
