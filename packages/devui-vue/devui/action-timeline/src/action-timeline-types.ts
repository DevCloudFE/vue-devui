import type { ExtractPropTypes, PropType } from 'vue';

export interface ActionItem {
  action?: string;
  actionContent?: string;
  createdAt?: string;
  icon?: string;
  status?: 'color-none' | 'color-danger' | 'color-info' | 'color-success';
  [k: string]: any;
}
export interface ActionData {
  time?: string;
  actions?: ActionItem[];
}
export type TimelineLayout = 'horizontal' | 'vertical';
export interface LoadMoreConfig {
  type?: string;
  loadMore?: boolean;
  isToTop?: boolean;
  loadMoreText?: string;
  toTopText?: string;
}
export const actionTimelineProps = {
  data: {
    type: Array as PropType<Array<ActionData>>,
  },
  layout: {
    type: String as PropType<TimelineLayout>,
    default: 'horizontal',
  },
  loadMoreConfig: {
    type: Object as PropType<LoadMoreConfig>,
  },
  showTailLine: {
    type: Boolean,
    default: true,
  },
  showStatusColor: {
    type: Boolean,
    default: false,
  },
  showStatusLineColor: {
    type: Boolean,
    default: false,
  },
};
export type ActionTimelineProps = ExtractPropTypes<typeof actionTimelineProps>;
