import type { PropType, ExtractPropTypes } from 'vue';

export type BadgeStatusType = 'danger' | 'warning' | 'waiting' | 'success' | 'info' | 'common';
export type BadgePositionType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

const badgeStatusType = ['danger', 'warning', 'waiting', 'success', 'info', 'common'];
const badgePositionType = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

export const badgeProps = {
  count: {
    type: [Number, String],
  },
  maxCount: {
    type: Number,
    default: 99,
  },
  showDot: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String as PropType<BadgeStatusType>,
    validator: (val: string): boolean => badgeStatusType.includes(val),
    default: 'info',
  },
  position: {
    type: String as PropType<BadgePositionType>,
    default: 'top-right',
    validator: (val: string): boolean => badgePositionType.includes(val),
  },
  offset: {
    type: Array as PropType<Array<number>>,
  },
  bgColor: {
    type: String,
  },
  textColor: {
    type: String,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
};

export type BadgeProps = ExtractPropTypes<typeof badgeProps>;
