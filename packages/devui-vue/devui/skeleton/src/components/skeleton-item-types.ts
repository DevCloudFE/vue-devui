import type { ExtractPropTypes, PropType, ComputedRef } from 'vue';

export type IVariant = 'image' | 'circle' | 'square';
export type ISize = 'lg' | 'md' | 'sm';

export const skeletonItemProps = {
  variant: {
    type: String as PropType<IVariant>,
    default: 'square',
  },
  size: {
    type: String as PropType<ISize>,
    default: 'md',
  },
} as const;

export type SkeletonItemProps = ExtractPropTypes<typeof skeletonItemProps>;

export interface UseSkeletonItem {
  classes: ComputedRef<Record<string, boolean>>;
}
