import { Ref } from 'vue';
import useOperate from './use-operate';
import { IInnerTreeNode, IUseCore, IUseMergeNodes } from './use-tree-types';

export default function () {
  return function useMergeNodes(data: Ref<IInnerTreeNode[]>, core: IUseCore): IUseMergeNodes {
    const { setNodeValue, getChildren } = core;
    const { removeNode } = useOperate()(data, core);

    const mergeTreeNodes = () => {
      const mergeToNode = (node: IInnerTreeNode) => {
        if (node.isLeaf) {
          return;
        }

        const children = getChildren(node, { recursive: false });
        if (children?.length === 1) {
          const subChildren = getChildren(children[0], { recursive: false });

          if (subChildren.length !== 0) {
            setNodeValue(node, 'label', node.label + ' / ' + children[0]?.label);
            removeNode(children[0], { recursive: false });
            mergeToNode(node);
          } else {
            setNodeValue(children[0], 'parentId', node.id);
          }
        } else {
          children.forEach((item) => {
            mergeToNode(item);
          });
        }
      };

      data.value
        .filter((item) => item.level === 1)
        .forEach((item) => {
          mergeToNode(item);
        });
    };

    return {
      mergeTreeNodes,
    };
  };
}
