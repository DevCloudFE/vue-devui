import type { PropType, ExtractPropTypes, CSSProperties } from 'vue';

export const virtualListProps = {
  data: {
    type: Array,
    default: () => [],
  },
  style: {
    type: Object as PropType<CSSProperties>,
  },
  class: {
    type: String,
    default: '',
  },
  component: {
    type: String,
    default: 'div',
  },
  height: {
    type: Number,
  },
} as const;

export const virtualListFllterProps = {
  data: {
    type: Array,
    default: () => [],
  },
} as const;

export const virtualListScrollBarProps = {
  data: {
    type: Array,
    default: () => [],
  },
} as const;

export type VirtualListProps = ExtractPropTypes<typeof virtualListProps>;
