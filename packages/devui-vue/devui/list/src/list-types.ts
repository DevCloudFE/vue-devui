import type { PropType, ExtractPropTypes } from 'vue';
import { PaginationProps } from '../../pagination/src/pagination-types';

export type ListSize = 'sm' | 'md' | 'lg';

export const listProps = {
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  distance: {
    type: [String, Number] as PropType<string | number>,
    default: 0,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array as PropType<unknown[]>,
    default: [],
  },
  footer: {
    type: String,
    default: '',
  },
  header: {
    type: String,
    default: '',
  },
  layout: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadMore: {
    type: String,
    default: '',
  },
  loadMoreFn: {
    type: Function,
  },
  pagination: {
    type: Object as PropType<PaginationProps>,
  },
  size: {
    type: String as PropType<ListSize>,
    default: 'md',
  },
  split: {
    type: Boolean,
    default: true,
  },
} as const;

export type ListProps = ExtractPropTypes<typeof listProps>;

export const listItemProps = {
  extra: {
    type: String,
    default: '',
  },
};

export type ListItemProps = ExtractPropTypes<typeof listItemProps>;

export const listItemMetaProps = {
  description: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
};

export type ListItemMetaProps = ExtractPropTypes<typeof listItemMetaProps>;
