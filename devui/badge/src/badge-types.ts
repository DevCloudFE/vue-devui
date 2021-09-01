import type { PropType, ExtractPropTypes } from 'vue'

type BadgeStatusType = PropType<'danger' | 'warning' | 'waiting' | 'success' | 'info'>
type BadgePositionType = PropType<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>

const badgeStatusType = ['danger', 'warning', 'waiting', 'success', 'info']
const badgePositionType = ['top-left', 'top-right', 'bottom-left', 'bottom-right']

export const badgeProps = {
  count: {
    type: [Number, String]
  },
  maxCount: {
    type: Number,
    default: 99
  },
  showDot: {
    type: Boolean,
    default: false
  },
  status: {
    type: String as BadgeStatusType,
    validator: (val: string) => badgeStatusType.includes(val)
  },
  badgePos: {
    type: String as BadgePositionType,
    default: 'top-right',
    validator: (val: string) => badgePositionType.includes(val)
  },
  offsetXY: {
    type: Array
  },
  bgColor: {
    type: String
  },
  textColor: {
    type: String
  }
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
