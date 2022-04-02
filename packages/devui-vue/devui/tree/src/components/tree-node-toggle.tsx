import { defineComponent, inject, PropType, toRefs } from 'vue';
import { USE_TREE_TOKEN } from '../const';
import { ITreeNode } from '../core/tree-factory-types';
import { IconClose } from './icon-close';
import { IconOpen } from './icon-open';

export default defineComponent({
  name: 'DTreeNodeToggle',
  props: {
    data: {
      type: Object as PropType<ITreeNode>,
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const treeFactory = inject(USE_TREE_TOKEN);
    const { toggleNode } = treeFactory;

    return () => {
      return (
        <span
          class="devui-tree-node__folder"
          onClick={() => {
            toggleNode(data.value);
          }}>
          {
            data.value.isLeaf
            ? <span class="devui-tree-node__indent" />
            : data.value.expanded
              ? <IconOpen class="mr-xs" />
              : <IconClose class="mr-xs" />
          }
        </span>
      );
    };
  },
});
