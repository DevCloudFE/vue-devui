import type { ExtractPropTypes, PropType } from 'vue';
import type { ICheck, ITreeNode } from './composables/use-tree-types';

export const treeProps = {
  data: {
    type: Object as PropType<ITreeNode[]>,
    default: []
  },
  check: {
    type: [Boolean, String] as PropType<ICheck>,
    default: false
  },
  height: {
    type: [Number, String] as PropType<number | string>,
  },
};

export type TreeProps = ExtractPropTypes<typeof treeProps>;
