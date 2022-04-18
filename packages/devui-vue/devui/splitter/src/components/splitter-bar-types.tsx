import { PropType, ExtractPropTypes } from 'vue';
import { SplitterOrientation } from '../splitter-types';

export const splitterBarProps = {
  /**
   * 当前 pane 的索引
   */
  index: {
    type: Number,
  },
  /**
   * 必选，指定 SplitterBar 的方向
   */
  orientation: {
    type: String as PropType<SplitterOrientation>,
    required: true,
  },
  /**
   * 分隔条大小
   */
  splitBarSize: {
    type: String,
    required: true,
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
  },
} as const;

export type SplitterBarProps = ExtractPropTypes<typeof splitterBarProps>;
