import { defineComponent, inject, toRefs, onUpdated, ref } from 'vue';
import { TreeRootType } from './deprecated-tree-types';
import { useNamespace } from '../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'DTreeNodeContent',
  props: {
    node: {
      type: Object,
      required: true,
    },
    editStatusReflect: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('tree');
    const tree = inject<TreeRootType>('treeRoot');

    const getCurID = (id) => `devui-tree-node__input-${id}`;
    onUpdated(() => {
      const target = document.querySelector(`#${getCurID(props.node.id)}`) as HTMLInputElement;
      target?.focus();
    });

    return () => {
      const { node, editStatusReflect } = toRefs(props); // 闭包
      const { disabled, label, id } = node.value; // 闭包
      const handleChange = ({ target }) => {
        node.value.label = target.value;
      };
      const handleBlur = () => {
        editStatusReflect.value[id] = false;
      };
      return tree.ctx.slots.default ? (
        tree.ctx.slots.default({ node })
      ) : (
        <span class={[ns.e('node-title'), disabled && 'select-disabled']}>
          {editStatusReflect.value[id] ? (
            <input id={getCurID(id)} ref={ref} value={label} onChange={handleChange} onBlur={handleBlur} />
          ) : (
            label
          )}
        </span>
      );
    };
  },
});
