import type { PropType, ExtractPropTypes, InjectionKey, Ref, WritableComputedRef } from 'vue';

export type PageSizeDirection = 'bottom' | 'top' | 'left' | 'right';

type Size = 'lg' | '' | 'sm';

export const paginationProps = {
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
  pageSizeOptions: {
    type: Array as PropType<number[]>,
    default: () => [5, 10, 20, 50],
  },
  pageSizeDirection: {
    type: Array as PropType<Array<PageSizeDirection>>,
    default: () => ['bottom', 'top', 'left', 'bottom'],
  },
  pageIndex: {
    type: Number,
    default: 1,
  },
  maxItems: {
    type: Number,
    default: 10,
  },
  preLink: {
    type: String,
    default: '',
  },
  nextLink: {
    type: String,
    default: '',
  },
  size: {
    type: String as PropType<Size>,
    default: '',
  },
  canJumpPage: {
    type: Boolean,
    default: false,
  },
  canChangePageSize: {
    type: Boolean,
    default: false,
  },
  canViewTotal: {
    type: Boolean,
    default: false,
  },
  totalItemText: {
    type: String,
  },
  goToText: {
    type: String,
  },
  showJumpButton: {
    type: Boolean,
    default: false,
  },
  showTruePageIndex: {
    type: Boolean,
    default: false,
  },
  lite: {
    type: Boolean,
    default: false,
  },
  showPageSelector: {
    type: Boolean,
    default: true,
  },
  haveConfigMenu: {
    type: Boolean,
    default: false,
  },
  autoFixPageIndex: {
    type: Boolean,
    default: true,
  },
  autoHide: {
    type: Boolean,
    default: false,
  },
  'onUpdate:pageIndex': {
    type: Function as PropType<(v: number) => void>,
  },
  'onUpdate:pageSize': {
    type: Function as PropType<(v: number) => void>,
  },
  onPageIndexChange: {
    type: Function as PropType<(v: number) => void>,
  },
  onPageSizeChange: {
    type: Function as PropType<(v: number) => void>,
  },
  maxPage: {
    type: Number,
    default: 0,
  },
} as const;

// 组件props
export type PaginationProps = ExtractPropTypes<typeof paginationProps>;

export interface IPagination {
  size: Ref<Size>;
  currentPageSize: WritableComputedRef<number>;
  pageSizeOptions: Ref<number[]>;
  pageSizeDirection: Ref<PageSizeDirection[]>;
  pageSizeChange: (val: number) => void;
  t: (path: string) => void;
}

export const paginationInjectionKey: InjectionKey<IPagination> = Symbol('d-pagination');
