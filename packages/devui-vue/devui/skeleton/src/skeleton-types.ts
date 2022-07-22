import type { ExtractPropTypes, InjectionKey, Ref } from 'vue';

export const skeletonProps = {
  rows: {
    type: Number,
    default: 3,
  },
  round: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: true,
  },
  showAnimation: {
    type: Boolean,
    default: true,
  },
} as const;

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>;

export const roundInjectionKey: InjectionKey<Ref<boolean>> = Symbol('round');
export const animationInjectionKey: InjectionKey<Ref<boolean>> = Symbol('showAnimation');
