import { ref, Ref, watch } from 'vue';
import { TreeData, TreeItem } from '../deprecated-tree-types';

interface IUseToggle {
  openedData: Ref<TreeData>;
  toggle: (target: Event, item: TreeItem) => void;
}

export default function useToggle(data: Ref<TreeData>): IUseToggle {
  const openedTree = (tree: TreeData): TreeData => {
    return tree.reduce((acc: TreeData, item: TreeItem) => (
      item.open
        ? acc.concat(item, item.children ? openedTree(item.children) : [])
        : acc.concat(item)
    ), []);
  };

  const openedData = ref(openedTree(data.value));

  watch(
    () => data.value,
    (d) => openedData.value = openedTree(d),
    { deep: true }
  );
  const toggle = (target: Event, item: TreeItem) => {
    target.stopPropagation();
    if (!item.children) {return;}
    item.open = !item.open;
    openedData.value = openedTree(data.value);
  };

  return {
    openedData,
    toggle,
  };
}
