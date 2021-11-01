import type { PropType, ExtractPropTypes, ComponentPublicInstance } from 'vue'

export const dropdownProps = {

  origin: {
    type: Object as PropType<Element | ComponentPublicInstance>
  },

  isOpen: {
    type: Boolean,
    default: false
  },

  disabled: {
    type: Boolean,
    default: false
  },

  trigger: {
    type: String as PropType<'click' | 'hover' | 'manually'>,
    default: 'click'
  },

  closeScope: {
    type: String as PropType<'all' | 'blank' | 'none'>,
    default: 'all'
  },

  closeOnMouseLeaveMenu: {
    type: Boolean,
    default: true
  },

  showAnimation: {
    type: Boolean,
    default: true
  }

} as const

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
