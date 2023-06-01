import type { PropType, ExtractPropTypes } from 'vue';
import { GridStackOptions } from 'gridstack';

export const dashboardProps = {
  // 高级配置用于做完全自定义的配置化，会覆盖掉下面的配置
  advancedOptions: {
    type: Object as PropType<GridStackOptions>,
    default: {},
  },
  /**
   * [Reactive]
   * 设置当前dashboard列数，> 12 列时，需要自行定义css来定义样式
   * eg: 一个20列的例子
   * .grid-stack.grid-stack-20 {
   *    & .grid-stack-item {
   *      $gridstack-columns: 20;
   *      min-width: 100% / $gridstack-columns; // 最小宽度设置
   *      @for $i from 0 through $gridstack-columns {
   *        // 宽度
   *        &[gs-w='#{$i}'] {
   *          width: (100% / $gridstack-columns) * $i;
   *        }
   *        // x轴位置
   *        &[gs-x='#{$i}'] {
   *          left: (100% / $gridstack-columns) * $i;
   *        }
   *        &[gs-min-w='#{$i}'] {
   *          min-width: (100% / $gridstack-columns) * $i;
   *        }
   *        &[gs-max-w='#{$i}'] {
   *          max-width: (100% / $gridstack-columns) * $i;
   *        }
   *      }
   *    }
   * }
   */
  column: {
    type: Number,
    default: 12,
  },
  // [Reactive] 最小行数，可以通过设置 css: min-height 实现一样的效果
  minRow: {
    type: Number,
    default: 0,
  },
  // [Reactive] 最大行数，存在最大行数限制情况时，将会限制 drag / drop 行为，只有在确保剩余空间足够的情况下，drag / drop 才能正常发生
  maxRow: {
    type: Number,
    default: 0,
  },
  // [Reactive] 每个单元格高度，默认为 auto 自动计算，趋于正方形；number 时默认单位px；string 支持 em/rem/px
  cellHeight: {
    type: [Number, String],
    default: 'auto',
  },
  // [Reactive] widget 间距（实质上是用 inset 实现）
  margin: {
    type: [Number, String],
    default: 8,
  },
  // [Reactive] 是否开启浮动模式；浮动模式下能够随意拖拽摆放widget位置。非浮动模式下，widget在垂直方向的上方不允许为空（类似紧凑模式的概念）
  float: {
    type: Boolean,
    default: true,
  },
  // [Reactive] 调整宽高和移动卡片的时候是否启用动画
  animate: {
    type: Boolean,
    default: true,
  },
  // [Reactive] 是否为静态模式，true将禁用：resize/drag/drop
  static: {
    type: Boolean,
    default: false,
  },
  // [Reactive] 禁止内部widget拖拽移动
  disableDrag: {
    type: Boolean,
    default: false,
  },
  // [Reactive] 禁止内部widget拖拽改变大小
  disableResize: {
    type: Boolean,
    default: false,
  },
  // 指定当前仪表盘widget回收站的选择器，或传入布尔值，true为只要移出dashboard即删除，false则不注册回收站
  trashSelector: {
    type: [String, Boolean],
  },
  // 指定拖拽新增的策略
  acceptWidgets: {
    type: [Boolean, String, Function],
    default: undefined,
  },
  // [Reactive] 是否显示布局网格
  showGridBlock: {
    type: Boolean,
    default: false,
  },
  // [Reactive] 是否显示 widget 自带的背景和阴影
  showWidgetBg: {
    type: Boolean,
    default: true,
  },
};

export const dashboardEmitEvents = [
  'widgetAdded',
  'widgetChanged',
  'widgetRemoved',
  'dashboardInit',
  'update:column',
  'update:minRow',
  'update:maxRow',
  'update:static',
  'update:animate',
] as const;

export type DashboardEmitEvent = (event: (typeof dashboardEmitEvents)[number], ...args: any[]) => void;

export type DashboardProps = ExtractPropTypes<typeof dashboardProps>;
