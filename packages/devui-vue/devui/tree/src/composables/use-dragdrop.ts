import { reactive, computed } from 'vue';
import type { Ref } from 'vue';
import type { TreeProps } from '../tree-types';
import type { DragState, IUseDraggable, IDropNode, IInnerTreeNode, ITreeNode, IDropType } from './use-tree-types';
import cloneDeep from 'lodash/cloneDeep';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { formatBasicTree } from '../utils';
const ns = useNamespace('tree');

const dropTypeMap = {
  dropPrev: ns.em('node', 'drop-prev'),
  dropNext: ns.em('node', 'drop-next'),
  dropInner: ns.em('node', 'drop-inner'),
};

export function useDragdrop(props: TreeProps, data: Ref<IInnerTreeNode[]>) {
  return function useDragdropFn(): IUseDraggable {
    const dragState = reactive<DragState>({
      dropType: undefined,
      draggingNode: null,
      draggingTreeNode: null,
    });

    const treeIdMapValue = computed<Record<string | number, IInnerTreeNode>>(() => {
      return data.value.reduce((acc, cur) => ({
        ...acc, [cur.id]: cur,
      }), {});
    });

    const removeDraggingStyle = (target: HTMLElement | null) => {
      target
        ?.classList
        .remove(...Object.values(dropTypeMap));
    };

    const checkIsParent = (childNodeId: number | string, parentNodeId: number | string): boolean => {
      const realParentId = treeIdMapValue.value[childNodeId]?.parentId;
      if (realParentId === parentNodeId) {
        return true;
      } else if (realParentId !== undefined) {
        return checkIsParent(realParentId, parentNodeId);
      } else {
        return false;
      }
    };

    const handlerDropData = (dragNodeId: string | number, dropNodeId: string | number, currentDropType?: string) => {
      const cloneData = cloneDeep(data.value);
      let currentDragNode: IDropNode | undefined;
      let currentDropNode: IDropNode | undefined;
      const findDragAndDropNode = (curr: ITreeNode[]) => {
        if (!Array.isArray(curr)) {
          return;
        }
        curr.every((item, index) => {
          if (currentDragNode && currentDropNode) {
            return false;
          }
          if (item.id === dragNodeId) {
            currentDragNode = { target: curr, index, item };
          } else if (item.id === dropNodeId) {
            currentDropNode = { target: curr, index, item };
          }
          if (!currentDragNode || !currentDropNode) {
            Array.isArray(item.children) && findDragAndDropNode(item.children);
          }
          return true;
        });
      };
      findDragAndDropNode(cloneData);
      if (currentDragNode && currentDropNode && currentDropType) {
        const cloneDrapNode = Object.assign({}, currentDragNode.target[currentDragNode.index]);
        if (currentDropType === 'dropPrev') {
          currentDropNode.target.splice(currentDropNode.index, 0, cloneDrapNode);
        } else if (currentDropType === 'dropNext') {
          currentDropNode.target.splice(currentDropNode.index + 1, 0, cloneDrapNode);
        } else if (currentDropType === 'dropInner') {
          const children = currentDropNode.target[currentDropNode.index].children;
          if (Array.isArray(children)) {
            children.unshift(cloneDrapNode);
          } else {
            currentDropNode.target[currentDropNode.index].children = [cloneDrapNode];
          }
        }
        const targetIndex = currentDragNode.target.indexOf(currentDragNode.item);
        if (targetIndex !== -1) {
          currentDragNode.target.splice(targetIndex, 1);
        }
      }

      return cloneData;
    };

    const clearDragDropInfo = () => {
      dragState.dropType = undefined;
      dragState.draggingNode = null;
      dragState.draggingTreeNode = null;
    };

    const onDragstart = (event: DragEvent, treeNode: IInnerTreeNode): void => {
      event.stopPropagation();
      dragState.draggingNode = event.target as HTMLElement | null;
      dragState.draggingTreeNode = treeNode;
      const treeInfo = {
        type: 'tree-node',
        nodeId: treeNode.id,
      };
      // 1. 是否成功设置treeInfo
      event.dataTransfer?.setData('Text', JSON.stringify(treeInfo));
    };

    const onDragover = (event: DragEvent): void => {
      event.preventDefault();
      event.stopPropagation();
      if (!dragState.draggingNode) { return; }

      if (props.dragdrop) {

        if (event.dataTransfer) {
          event.dataTransfer.dropEffect = 'move';
        }

        if (!data) {
          return;
        }
        let curDropType: IDropType = {};
        if (typeof props.dragdrop === 'object') {
          curDropType = props.dragdrop;
        } else if (props.dragdrop === true) {
          curDropType = { dropInner: true };
        }
        const { dropPrev, dropNext, dropInner } = curDropType;

        let innerDropType: DragState['dropType'];

        const prevPercent = dropPrev ? (dropInner ? 0.25 : dropNext ? 0.45 : 1) : -1;
        const nextPercent = dropNext ? (dropInner ? 0.75 : dropPrev ? 0.55 : 0) : 1;
        const currentTarget = event.currentTarget as HTMLElement | null;
        const targetPosition = currentTarget?.getBoundingClientRect();
        const distance = event.clientY - (targetPosition?.top || 0);

        if (distance < (targetPosition?.height || 0) * prevPercent) {
          innerDropType = 'dropPrev';
        } else if (distance > (targetPosition?.height || 0) * nextPercent) {
          innerDropType = 'dropNext';
        } else if (dropInner) {
          innerDropType = 'dropInner';
        } else {
          innerDropType = undefined;
        }
        if (innerDropType) {
          const classList = currentTarget?.classList;
          if (classList) {
            if (!classList.contains(dropTypeMap[innerDropType])) {
              removeDraggingStyle(currentTarget);
              classList.add(dropTypeMap[innerDropType]);
            }
          }
        } else {
          removeDraggingStyle(currentTarget);
        }
        dragState.dropType = innerDropType;
      }
    };

    const onDragleave = (event: DragEvent): void => {
      event.stopPropagation();
      if (!dragState.draggingNode) { return; }
      removeDraggingStyle(event.currentTarget as HTMLElement | null);
    };

    const onDrop = (event: DragEvent, dropNode: IInnerTreeNode): void => {
      event.preventDefault();
      event.stopPropagation();
      removeDraggingStyle(event.currentTarget as HTMLElement | null);
      if (!dragState.draggingNode) { return; }
      if (!props.dragdrop) { return; }

      const treeInfoStr = event.dataTransfer?.getData('Text');
      if (treeInfoStr) {
        try {
          const treeInfo = JSON.parse(treeInfoStr);
          if (typeof treeInfo === 'object' && treeInfo.type === 'tree-node') {
            const dragNodeId = treeInfo.nodeId;
            const isParent = checkIsParent(dropNode.id, dragNodeId);
            if (dragNodeId === dropNode.id || isParent) {
              return;
            }
            if (dragState.dropType) {
              let result = handlerDropData(dragNodeId, dropNode.id, dragState.dropType);
              result = formatBasicTree(result);
              data.value = result;
            }
          }
        } catch (e) {
          console.error(e);
        }
        clearDragDropInfo();
      }
    };

    const onDragend = (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      clearDragDropInfo();
    };

    return {
      onDragstart,
      onDragover,
      onDragleave,
      onDrop,
      onDragend,
    };
  };
}

