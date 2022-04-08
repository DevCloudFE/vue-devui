import type { PropType, ExtractPropTypes } from 'vue';
import type { LineStyle, TimePosition } from '../timeline-types';
export type Position = 'top' | 'bottom' | 'left' | 'right';
export type Type = 'primary' | 'success' | 'warning' | 'error';
export const timeAxisItemProps = {
  time: {
    type: String,
  },
  // 可选，自定义时间圈颜色
  dotColor: {
    type: String,
  },
  // 分界线的样式
  lineStyle: {
    type: String as PropType<LineStyle>,
    default: 'solid',
  },
  // 分界线的样式
  lineColor: {
    type: String,
  },
  // 分界线的样式
  position: {
    type: String as PropType<Position>,
  },
  // 设置时间位置
  timePosition: {
    type: String as PropType<TimePosition>,
    default: 'left',
  },
  // 时间点类型
  type: {
    type: String as PropType<Type>,
    default: 'primary',
  },
} as const;

export type TimelineItemProps = ExtractPropTypes<typeof timeAxisItemProps>;
