import type { PropType, ExtractPropTypes, ComponentPublicInstance } from 'vue'

export type TriggerType = 'click' | 'hover' | 'manually';
export type CloseScopeArea = 'all' | 'blank' | 'none';

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
    type: String as PropType<TriggerType>,
    default: 'click'
  },

  closeScope: {
    type: String as PropType<CloseScopeArea>,
    default: 'all'
  },

  closeOnMouseLeaveMenu: {
    type: Boolean,
    default: false
  },

  showAnimation: {
    type: Boolean,
    default: true
  },
  width: {
    type: [Number, String],
    default: '102px'
  }
} as const

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
