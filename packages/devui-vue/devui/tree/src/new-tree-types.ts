import { ExtractPropTypes, PropType } from 'vue';
import { ITreeNode } from './core/use-tree-types';

export type ICheckStrategy = 'upward' | 'downward' | 'both' | 'none';

export type ICheck = boolean | ICheckStrategy;

export const treeProps = {
  data: {
    type: Object as PropType<ITreeNode[]>,
    default: []
  },
  check: {
    type: [Boolean, String] as PropType<ICheck>,
    default: false
  },
};

export type TreeProps = ExtractPropTypes<typeof treeProps>;
