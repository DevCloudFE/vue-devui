import type { CSSProperties, InjectionKey, ComputedRef } from 'vue';
import { ListProps } from './list-types';

export type computedListKey<T, K extends keyof T = keyof T> = {
  [key in K]: ComputedRef<T[key]>;
};
export type ListKey = computedListKey<ListProps, 'data' | 'size' | 'split' | 'layout'> & { sizeStyle: ComputedRef<CSSProperties> };
export const listKey = Symbol() as InjectionKey<ListKey>;
