import type { ExtractPropTypes, PropType } from 'vue';
import type { ICheck, IOperate, ITreeNode } from './composables/use-tree-types';

export const treeProps = {
  data: {
    type: Object as PropType<ITreeNode[]>,
    default: []
  },
  check: {
    type: [Boolean, String] as PropType<ICheck>,
    default: false
  },
  operate: {
    type: [Boolean, String, Array] as PropType<IOperate>,
    default: false,
  },
  height: {
    type: [Number, String] as PropType<number | string>,
  }
};

export type TreeProps = ExtractPropTypes<typeof treeProps>;
