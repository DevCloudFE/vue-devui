import { ref } from 'vue';
import { TreeSelectProps, TreeItem } from '../src/tree-select-types';

export default function useToggle(props: TreeSelectProps): any {
  const visible = ref<boolean>(false);

  const selectToggle = () => {
    if(props.disabled) {return;}
    visible.value = !visible.value;
  };

  const treeToggle = (e: MouseEvent, item: TreeItem) => {
    e.preventDefault();
    e.stopPropagation();
    item.opened = ! item.opened;
  };

  return {
    visible,
    selectToggle,
    treeToggle,
  };
}
