import { Ref, ref, watch } from 'vue';
import { TreeItem } from '../tree-types';

export default function useMergeNode(data: Ref<TreeItem[]>): any {
  const mergeObject = (treeItem, childName = 'children', labelName = 'label') => {
    const { [childName]: children, [labelName]: label } = treeItem;
    if (
      Array.isArray(children) &&
      children.length === 1 &&
      children[0][childName] &&
      children[0][childName].length === 1
    ) {
      return mergeObject(
        Object.assign({}, children[0], {
          [labelName]: `${label} \\ ${children[0][labelName]}`
        })
      );
    }
    return treeItem;
  };

  const mergeNode = (
    tree: Array<any>,
    level = 0,
    childName = 'children',
    labelName = 'label'
  ): Array<any> => {
    return tree.map((item) => {
      const { [childName]: children } = item;
      if (!Array.isArray(children) || !children.length) {
        return Object.assign({}, item, { level: level + 1 });
      }
      let currentObject = item;
      if (children.length === 1) {
        currentObject = mergeObject(item);
      }
      return Object.assign({}, currentObject, {
        [childName]: mergeNode(currentObject[childName], level + 1, childName, labelName),
        level: level + 1
      });
    });
  };
  const mergeData = ref(mergeNode(data.value));
  watch(
    () => data.value,
    () => {
      mergeData.value = mergeNode(data.value);
    },
    { deep: true }
  );

  return {
    mergeData
  };
}
