import type { ExtractPropTypes, PropType } from 'vue';

export const dashboardWidgetProps = {
  // 是否忽略 x，y 自动寻找空位，非响应式，仅初始化有效
  autoPosition: {
    type: Boolean,
    default: false,
  },
  // 坐标 x（第 x 行），坐标原点为左上角，不传 ==> autoPosition
  x: {
    type: Number,
  },
  // 坐标 y（第 y 列）
  y: {
    type: Number,
  },
  // widget 宽度（单位列）
  w: {
    type: Number,
    default: 1,
  },
  // widget 高度（单位行）
  h: {
    type: Number,
    default: 1,
  },
  // widget 调整大小最小宽度，0 为不限制
  minW: {
    type: Number,
    default: 0,
  },
  // widget 调整大小最大宽度，0 为不限制
  maxW: {
    type: Number,
    default: 0,
  },
  // widget 调整大小最小高度，0 为不限制
  minH: {
    type: Number,
    default: 0,
  },
  // widget 调整大小最大高度，0 为不限制
  maxH: {
    type: Number,
    default: 0,
  },
  // widget 是否禁止调整大小
  noResize: {
    type: Boolean,
    default: false,
  },
  // widget 是否允许移动
  noMove: {
    type: Boolean,
    default: false,
  },
  // widget 是否锁定位置，不被其他 widget 位置挤压
  locked: {
    type: Boolean,
    default: false,
  },
  // widget 节点 id，对应生成 GridStackNode 的 id
  id: {
    type: Number || String,
  },
  // 用户自定义数据，可用于区分传递等等
  data: {
    type: String,
  },
} as const;

export type DashboardWidgetProps = ExtractPropTypes<typeof dashboardWidgetProps>;
