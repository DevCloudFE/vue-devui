import { ref, Ref, watch } from 'vue';

export default function useToggle(data: Ref<unknown>): any {
  const openedTree = (tree) => {
    return tree.reduce((acc, item) => (
      item.open
        ? acc.concat(item, openedTree(item.children))
        : acc.concat(item)
    ), []);
  };

  const openedData = ref(openedTree(data.value));

  watch(
    () => data.value,
    (d) => openedData.value = openedTree(d),
    { deep: true }
  );
  const toggle = (target, item) => {
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
