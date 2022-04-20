import type { ComputedRef } from 'vue';
import { defineComponent, PropType, toRefs } from 'vue';
import { ITreeNode, IInnerTreeNode } from '../composables/use-tree-types';
import useTreeNode from './use-tree-node';

export default defineComponent({
  name: 'DTreeNodeContent',
  props: {
    data: {
      type: Object as PropType<ITreeNode>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const {
      nodeTitleClass,
    } = useTreeNode(data as ComputedRef<IInnerTreeNode>);

    return () => {
      return (
        <span class={nodeTitleClass.value}>{data.value?.label}</span>
      );
    };
  },
});
