import { ref } from 'vue';
import { TreeSelectProps, TreeItem } from '../src/tree-select-types';

export default function useSelect(props: TreeSelectProps): any {
  const inputValue = ref<string | Array<string>>([]);
  const selectedCache = new Set();

  const selectValue = (item: TreeItem) => {
    if(!props.multiple) {
      inputValue.value = item.label;
    } else {
      item.checked = !item.checked;
      if(item.halfchecked) {item.halfchecked = false;}
      useCache(item);
      searchUp(item);
      searchDown(item);
      inputValue.value = [...selectedCache] as string[];
    }
  };

  const useCache = (item: TreeItem) => {
    item.checked === true
      ? selectedCache.add(item.label)
      : (selectedCache.has(item.label) && selectedCache.delete(item.label));
  };

  const searchUp = (item: TreeItem) => {

    if(!item.parent) {return;}
    let state = '';
    const checkedArr = item.parent.children.filter((el) => el.checked === true);
    switch(checkedArr.length) {
    case 0:
      state = 'none';
      break;
    case item.parent.children.length:
      state = 'checked';
      break;
    default:
      state = 'halfchecked';
      break;
    }

    if(state === 'checked') {
      item.parent.checked = true;
      item.parent.halfchecked = false;
    } else if(state === 'halfchecked') {
      item.parent.halfchecked = true;
      item.parent.checked = false;
    } else {
      item.parent.checked = false;
      item.parent.halfchecked = false;
    }

    useCache(item.parent);
    searchUp(item.parent);
  };

  const searchDown = (item: TreeItem) => {
    if(!item.children) {return;}
    item.children.forEach((el) => {
      el.checked = item.checked;
      useCache(el);
      searchDown(el);
    });
  };

  return {
    inputValue,
    selectValue
  };
}
