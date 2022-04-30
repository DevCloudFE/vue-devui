import type { PropType, ExtractPropTypes, VNode } from 'vue';
export type SplitterOrientation = 'vertical' | 'horizontal';
export type CollapseDirection = 'before' | 'after' | 'both';

export const splitterProps = {
  /**
   * 可选，指定 Splitter 分割方向,可选值'vertical'|'horizontal'
   */
  orientation: {
    type: String as PropType<SplitterOrientation>,
    default: 'horizontal',
  },
  /**
   * 可选，分隔条大小，默认 2px
   */
  splitBarSize: {
    type: String,
    default: '2px',
  },
  /**
   * 可选，pane 设置不可调整宽度时生效
   */
  disabledBarSize: {
    type: String,
    default: '1px',
  },
  /**
   * 是否显示展开/收缩按钮
   */
  showCollapseButton: {
    type: Boolean,
    default: true,
  },
} as const;

export type SplitterProps = ExtractPropTypes<typeof splitterProps>;
export interface SplitterState {
  panes: VNode[];
}
