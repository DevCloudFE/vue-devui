import { ComputedRef, defineComponent, PropType, toRefs } from 'vue';
import { IInnerTreeNode, useTreeNode } from '../composables';

export default defineComponent({
  name: 'DTreeNodeContent',
  props: {
    data: {
      type: Object as PropType<IInnerTreeNode>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const { nodeTitleClass, matchedContents, highlightCls } = useTreeNode(data as ComputedRef<IInnerTreeNode>);

    return () => {
      return (
        <span class={nodeTitleClass.value}>
          {!data.value?.matchedText && data.value?.label}
          {data.value?.matchedText &&
            matchedContents.value.map((item: string, index: number) => (index % 2 === 0 ? item : <span class={highlightCls}>{item}</span>))}
        </span>
      );
    };
  },
});
