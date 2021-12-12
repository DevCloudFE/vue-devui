import type { PropType, ExtractPropTypes } from 'vue'
type HorizontalConnectionPos = 'left' | 'center' | 'right';
type VerticalConnectionPos = 'top' | 'center' | 'bottom';

export interface ConnectionPosition {
  originX: HorizontalConnectionPos
  originY: VerticalConnectionPos
  overlayX: HorizontalConnectionPos
  overlayY: VerticalConnectionPos
}
export interface OptionItem {
  name: string
  [key: string]: any
}
export type Options = Array<string | OptionItem>
export const editableSelectProps = {
  appendToBody: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number] as PropType<string | number>
  },
  options: {
    type: Array as PropType<Options>,
    default: () => []
  },
  width: {
    type: Number,
    default: 450
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
  enableLazyLoad: {
    type: Boolean,
    default: false
  },
  remoteMethod: {
    type: Function as PropType<(inputValue: string) => Array<Options>>
  },
  filterMethod: {
    type: Function as PropType<(inputValue: string) => Array<Options>>
  },
  searchFn: {
    type: Function as PropType<(term: string) => Array<Options>>,
  },
  loadMore: {
    type: Function as PropType<() => Array<Options>>
  }
} as const

export const selectDropdownProps = {
  options: {
    type: Array as PropType<OptionItem[]>,
    default: () => []
  }
} as const
export type EditableSelectProps = ExtractPropTypes<typeof editableSelectProps>
export type SelectDropdownProps = ExtractPropTypes<typeof selectDropdownProps>