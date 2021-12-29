import type { PropType, ExtractPropTypes } from 'vue'

export const autoCompleteProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
} as const

export type AutoCompleteProps = ExtractPropTypes<typeof autoCompleteProps>
