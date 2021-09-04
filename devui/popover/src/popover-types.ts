import type { PropType, ExtractPropTypes, VNode } from 'vue'

export const popoverProps = {
  visible: {
    type: Boolean,
    default: false
  },
  content: {
    type: [String, Object as PropType<() => VNode>],
    default: ''
  },

  trigger: {
    type: String,
    default: 'click',
    validator: function (value: string) {
      return ['click', 'hover'].includes(value);
    }
  },
  controlled: {
    type: Boolean,
    default: false
  },

  popType: {
    type: String,
    default: 'default'
  }

} as const

export type PopoverProps = ExtractPropTypes<typeof popoverProps>
