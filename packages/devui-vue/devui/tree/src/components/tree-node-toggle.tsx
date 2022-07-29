import { defineComponent, inject, PropType, toRefs } from 'vue';
import { USE_TREE_TOKEN } from '../const';
import { ITreeNode, IUseTree } from '../composables';
import { IconClose } from './icon-close';
import { IconOpen } from './icon-open';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'DTreeNodeToggle',
  props: {
    data: {
      type: Object as PropType<ITreeNode>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const { toggleNode } = inject(USE_TREE_TOKEN) as Partial<IUseTree>;
    const ns = useNamespace('tree');

    return () => {
      return (
        <span
          class={[ns.e('node-folder'), data.value?.disableToggle && 'toggle-disabled']}
          onClick={(event: MouseEvent) => {
            event.stopPropagation();
            if (toggleNode) {
              toggleNode(data.value);
            }
          }}>
          {data.value.isLeaf ? (
            <span class={ns.e('node-indent')} />
          ) : data.value.expanded ? (
            <IconOpen class="mr-xs" />
          ) : (
            <IconClose class="mr-xs" />
          )}
        </span>
      );
    };
  },
});
