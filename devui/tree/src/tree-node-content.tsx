import { defineComponent, h, inject } from 'vue';
import { TreeRootType } from './tree-types';

export default defineComponent({
  name: 'DTreeNodeContent',
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const tree = inject<TreeRootType>('treeRoot');
    return () => {
      const node = props.node;
      const { disabled, label } = node;
      return tree.ctx.slots.default
        ? tree.ctx.slots.default({ node })
        : h('span', 
            { class: ['devui-tree-node__title', disabled && 'select-disabled'], },
            [label]
          );
    };
  },
});
