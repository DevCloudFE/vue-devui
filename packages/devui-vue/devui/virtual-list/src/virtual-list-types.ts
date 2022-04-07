import type { ExtractPropTypes } from 'vue';

export const virtualListProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
} as const;

export type VirtualListProps = ExtractPropTypes<typeof virtualListProps>;
