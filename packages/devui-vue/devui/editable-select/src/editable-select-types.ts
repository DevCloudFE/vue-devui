import type { PropType, ExtractPropTypes } from 'vue'
export interface OptionItem {
  name: string
  [key: string]: any
}
export type Options = Array<string | OptionItem>
export const editableSelectProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
  modelValue: {
    type: [String, Number] as PropType<string | number>
  },
  options: {
    type: Array as PropType<Options>,
    default: () => []
  },
  width: {
    type: Number
  },
  maxHeight: {
    type: Number
  },
  disabled: {
    type: Boolean,
    default: false
  },
  disabledKey: {
    type: String,
  },
  remote: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean
  },
  remoteMethod: {
    type: Function as PropType<(inputValue: string) => Array<Options>>
  },
  filterMethod: {
    type: Function as PropType<(inputValue: string) => Array<Options>>
  },
  searchFn: {
    type: Function as PropType<(term: string) => Array<Options>>,
  }
} as const

export type EditableSelectProps = ExtractPropTypes<typeof editableSelectProps>
