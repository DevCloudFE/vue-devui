import { defineComponent, PropType, toRefs } from 'vue';
import { ITreeNode } from '../core/use-tree-types';
import useTreeNode from './use-tree-node';

export default defineComponent({
  name: 'DTreeNodeContent',
  props: {
    data: {
      type: Object as PropType<ITreeNode>,
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const {
      nodeTitleClass,
    } = useTreeNode(data);

    return () => {
      return (
        <span class={nodeTitleClass.value}>{data.value?.label}</span>
      );
    };
  },
});
