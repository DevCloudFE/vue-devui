import { reactive, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { TreeItem, IDropType, Nullable } from '../deprecated-tree-types';
import cloneDeep from 'lodash/cloneDeep';
import { useNamespace } from '../../../shared/hooks/use-namespace';

const ns = useNamespace('tree');
const ACTIVE_NODE = ns.em('node-content', 'value-wrapper');
interface DragState {
  dropType?: 'prev' | 'next' | 'inner';
  draggingNode?: Nullable<HTMLElement>;
}

interface IUseDraggable {
  onDragstart: (event: DragEvent, treeNode: TreeItem) => void;
  onDragover: (event: DragEvent) => void;
  onDragleave: (event: DragEvent) => void;
  onDrop: (event: DragEvent, dropNode: TreeItem) => void;
  dragState: DragState;
}

interface IDropNode {
  target: TreeItem[];
  index: number;
  item: TreeItem;
}

export default function useDraggable(
  draggable: boolean,
  dropType: IDropType,
  node: Ref<Nullable<HTMLElement>>,
  renderData: Ref<TreeItem[]>,
  data: Ref<TreeItem[]>
): IUseDraggable {
  const dragState = reactive<DragState>({
    dropType: undefined,
    draggingNode: null,
  });
  const treeIdMapValue = ref<{ [key: string]: string }>({});
  watch(
    () => renderData.value,
    () => {
      treeIdMapValue.value = renderData.value.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {});
    },
    { deep: true, immediate: true }
  );

  const removeDraggingStyle = (target: Nullable<HTMLElement>) => {
    target?.querySelector(`.${ACTIVE_NODE}`)?.classList.remove(...['prev', 'next', 'inner'].map((item) => ns.e(`drop-${item}`)));
  };

  const checkIsParent = (childNodeId: number | string, parentNodeId: number | string): boolean => {
    const realParentId = treeIdMapValue.value[childNodeId].parentId;
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
    let nowDragNode: IDropNode;
    let nowDropNode: IDropNode;
    const findDragAndDropNode = (curr: TreeItem[]) => {
      if (!Array.isArray(curr)) {
        return;
      }
      curr.every((item, index) => {
        if (nowDragNode && nowDropNode) {
          return false;
        }
        if (item.id === dragNodeId) {
          nowDragNode = { target: curr, index, item };
        } else if (item.id === dropNodeId) {
          nowDropNode = { target: curr, index, item };
        }
        if (!nowDragNode || !nowDropNode) {
          findDragAndDropNode(item.children);
        }
        return true;
      });
    };
    findDragAndDropNode(cloneData);
    if (nowDragNode && nowDropNode && currentDropType) {
      const cloneDrapNode = cloneDeep(nowDragNode.target[nowDragNode.index]);
      if (currentDropType === 'prev') {
        nowDropNode.target.splice(nowDropNode.index, 0, cloneDrapNode);
      } else if (currentDropType === 'next') {
        nowDropNode.target.splice(nowDropNode.index + 1, 0, cloneDrapNode);
      } else if (currentDropType === 'inner') {
        const children = nowDropNode.target[nowDropNode.index].children;
        if (Array.isArray(children)) {
          children.unshift(cloneDrapNode);
        } else {
          nowDropNode.target[nowDropNode.index].children = [cloneDrapNode];
        }
      }
      const targetIndex = nowDragNode.target.indexOf(nowDragNode.item);
      if (targetIndex !== -1) {
        nowDragNode.target.splice(targetIndex, 1);
      }
    }

    return cloneData;
  };
  const onDragstart = (event: DragEvent, treeNode: TreeItem): void => {
    dragState.draggingNode = <Nullable<HTMLElement>>event.target;
    const treeInfo = {
      type: 'tree-node',
      nodeId: treeNode.id,
    };
    event.dataTransfer?.setData('Text', JSON.stringify(treeInfo));
  };
  const onDragover = (event: DragEvent): void => {
    if (draggable) {
      event.preventDefault();

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }

      if (!node) {
        return;
      }
      const dropPrev = dropType.dropPrev;
      const dropNext = dropType.dropNext;
      const dropInner = dropType.dropInner;

      let innerDropType;

      const prevPercent = dropPrev ? (dropInner ? 0.25 : dropNext ? 0.45 : 1) : -1;
      const nextPercent = dropNext ? (dropInner ? 0.75 : dropPrev ? 0.55 : 0) : 1;
      const currentTarget = <Nullable<HTMLElement>>event.currentTarget;
      const targetPosition = currentTarget.getBoundingClientRect();
      const distance = event.clientY - targetPosition.top;

      if (distance < targetPosition.height * prevPercent) {
        innerDropType = 'prev';
      } else if (distance > targetPosition.height * nextPercent) {
        innerDropType = 'next';
      } else if (dropInner) {
        innerDropType = 'inner';
      } else {
        innerDropType = undefined;
      }
      removeDraggingStyle(currentTarget);
      if (innerDropType && innerDropType !== 'none') {
        currentTarget.querySelector(`.${ACTIVE_NODE}`)?.classList.add(ns.e(`drop-${innerDropType}`));
      }
      dragState.dropType = innerDropType;
    }
  };
  const onDragleave = (event: DragEvent): void => {
    removeDraggingStyle(<Nullable<HTMLElement>>event.currentTarget);
  };
  const onDrop = (event: DragEvent, dropNode: TreeItem): void => {
    removeDraggingStyle(<Nullable<HTMLElement>>event.currentTarget);
    if (!draggable) {
      return;
    }
    event.preventDefault();
    const transferDataStr = event.dataTransfer?.getData('Text');
    if (transferDataStr) {
      try {
        const transferData = JSON.parse(transferDataStr);
        if (typeof transferData === 'object' && transferData.type === 'tree-node') {
          const dragNodeId = transferData.nodeId;
          const isParent = checkIsParent(dropNode.id, dragNodeId);
          if (dragNodeId === dropNode.id || isParent) {
            return;
          }
          let result;
          if (dragState.dropType) {
            result = handlerDropData(dragNodeId, dropNode.id, dragState.dropType);
          }
          data.value = result;
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return {
    onDragstart,
    onDragover,
    onDragleave,
    onDrop,
    dragState,
  };
}
