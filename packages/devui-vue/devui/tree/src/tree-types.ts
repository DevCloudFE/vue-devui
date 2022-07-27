import type { ExtractPropTypes, PropType } from 'vue';
import type { ICheck, IOperate, ITreeNode, IDropType, IInnerTreeNode } from './composables/use-tree-types';

export const treeProps = {
  data: {
    type: Object as PropType<ITreeNode[]>,
    default: []
  },
  check: {
    type: [Boolean, String] as PropType<ICheck>,
    default: false
  },
  draggable: {
    type: Boolean,
    default: false
  },
  dropType: {
    type: Object as PropType<IDropType>,
    default: { dropInner: true }
  },
  operate: {
    type: [Boolean, String, Array] as PropType<IOperate>,
    default: false,
  },
  height: {
    type: [Number, String] as PropType<number | string>,
  }
};

export const treeNodeProps = {
  data: {
    type: Object as PropType<IInnerTreeNode>,
    default: {},
  },
  check: {
    type: [Boolean, String] as PropType<ICheck>,
    default: false,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  operate: {
    type: [Boolean, String, Array] as PropType<IOperate>,
    default: false,
  },
};

export type TreeProps = ExtractPropTypes<typeof treeProps>;

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>;
