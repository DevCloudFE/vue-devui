import type { PropType, ExtractPropTypes, CSSProperties, VNodeTypes } from 'vue';

interface ResizeObserverSize {
  width: number;
  height: number;
  offsetWidth: number;
  offsetHeight: number;
}

export const virtualListProps = {
  data: {
    type: Array as PropType<Record<string, never>[]>,
    default: () => [],
  },
  component: {
    type: String,
    default: 'div',
  },
  height: {
    type: Number,
    default: 100,
  },
  itemHeight: {
    type: Number,
    default: 0,
  },
  virtual: {
    type: Boolean,
    default: true,
  },
  fullHeight: {
    type: Boolean,
  },
  itemKey: {
    type: [String, Number, Function] as PropType<string | number | ((item: Record<string, never>) => string | number)>,
    required: true,
  },
} as const;

export const resizeObserverContainerProps = {
  height: {
    type: Number,
  },
  offset: {
    type: Number || undefined,
  },
  disabled: {
    type: Function as PropType<() => void>,
  },
  onInnerResize: {
    type: Function as PropType<() => void>,
  }
} as const;

export const scrollBarProps = {
  scrollTop: {
    type: Number
  },
  scrollHeight: {
    type: Number
  },
  height: {
    type: Number
  },
  count: {
    type: Number
  },
  onScroll: {
    type: Function as PropType<(scrollTop: number) => void>,
  },
  onStartMove: {
    type: Function as PropType<() => void>,
  },
  onStopMove: {
    type: Function as PropType<() => void>,
  },
} as const;

export const resizeObserverProps = {
  disabled: {
    type: Boolean,
  },
  onResize: {
    type: Function as PropType<(size: ResizeObserverSize, element: HTMLElement) => void>
  },
} as const;

export type RenderFunc<T> = (
  item: T,
  index: number,
  props: { style?: CSSProperties },
) => VNodeTypes;

export interface SharedConfig<T> {
  getKey: (item: T) => string | number | undefined;
}

export interface IScrollBarExposeFunction {
  onShowBar?: () => void;
}

export type GetKey<T = Record<string, never>> = (item: T) => string | number | undefined;

export type CacheMap = Map<unknown, number>;

export type VirtualListProps = ExtractPropTypes<typeof virtualListProps>;
