import { ExtractPropTypes, PropType } from 'vue';
import { ICheck, ITreeNode } from './composables/use-tree-types';

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
