import { ExtractPropTypes, PropType } from 'vue';
import { CollapseDirection } from '../splitter-types';

export const splitterPaneProps = {
  /**
   * 可选，指定 pane 宽度，设置像素值或者百分比
   * pane初始化大小
   */
  size: {
    type: String,
  },
  /**
   * 可选，指定 pane 最小宽度，设置像素值或者百分比
   */
  minSize: {
    type: String,
  },
  /**
   * 可选，指定 pane 最大宽度，设置像素值或者百分比
   */
  maxSize: {
    type: String,
  },
  /**
   * 可选，指定 pane 是否可调整大小，会影响相邻 pane
   */
  resizable: {
    type: Boolean,
    default: true,
  },
  /**
   * 可选，指定 pane 是否可折叠收起
   */
  collapsible: {
    type: Boolean,
    default: false,
  },
  /**
   * 可选，指定 pane 初始化是否收起，配合 collapsible 使用
   */
  collapsed: {
    type: Boolean,
    default: false,
  },
  /**
   * 非边缘面板折叠方向，before 只生成向前折叠的按钮，after 生成向后折叠按钮，both 生成两个
   */
  collapseDirection: {
    type: String as PropType<CollapseDirection>,
    default: 'both',
  },
  /**
   * 可选，是否在 pane 进行折叠后收缩 pane 宽度而非收起
   */
  shrink: {
    type: Boolean,
    default: false,
  },
  /**
   * 可选，折叠后收缩的 pane 宽度 （单位：px）
   */
  shrinkWidth: {
    type: Number,
    default: 36,
  },
} as const;

export type SplitterPaneProps = ExtractPropTypes<typeof splitterPaneProps>;
