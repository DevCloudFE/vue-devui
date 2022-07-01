import { debounce, cloneDeep } from 'lodash';
import { ref, SetupContext, UnwrapRef, Ref, watch } from 'vue';
import { initActiveIndexs } from './use-cascader-single';
import {
  CascaderItem,
  CascaderProps,
  suggestionListType,
  UseFilterFn,
  CascaderItemNeedType,
  CascaderValueType,
} from '../src/cascader-types';

export const useFilter = (
  props: CascaderProps,
  ctx: SetupContext,
  menuShow: Ref<boolean>,
  cascaderItemNeedProps: CascaderItemNeedType,
  updateCascaderView: (value: CascaderValueType, currentOption: CascaderItem[], index: number) => void,
  inputValue: Ref<string>,
  cascaderOptions: UnwrapRef<[CascaderItem[]]>
): UseFilterFn => {
  const suggestions = ref<suggestionListType[]>([]);
  const suggestionsList = ref<suggestionListType[]>([]);
  const isSearching = ref(false);
  const searchText = ref('');

  // 以下为搜索逻辑
  watch(menuShow, (val) => {
    if (!val) {
      isSearching.value = false;
    }
  });

  const isPromise = (obj: boolean | Promise<unknown>): boolean => {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
  };

  const setChildrenParent = (parentNode: CascaderItem) => {
    if (parentNode.children && parentNode.children.length) {
      parentNode.children.forEach((child) => {
        child.parent = parentNode;
        // 父级为disbled，子级添加为disabled
        if (parentNode.disabled) {
          child.disabled = true;
        }
      });
    }
    return parentNode;
  };

  const addParent = (data: CascaderItem[]) => {
    data.forEach((item) => {
      if (item.children && item.children.length) {
        setChildrenParent(item);
        addParent(item.children);
      } else {
        item.isLeaf = true;
      }
    });
    return data;
  };

  const allNodes = addParent(cloneDeep(props.options));
  const flatNodes = (data: CascaderItem[] = []) => {
    return data.reduce((res: CascaderItem[], node) => {
      if (node.children) {
        res.push(node);
        res = res.concat(flatNodes(node.children));
      } else {
        res.push(node);
      }
      return res;
    }, []);
  };
  const flatAllNodes = flatNodes(allNodes);
  const filterLeafs = () => {
    const leafs = flatAllNodes.filter((item) => {
      return item.isLeaf && !item.disabled;
    });
    return leafs;
  };

  const findParentValues = (item: CascaderItem, values: (string | number)[] = []) => {
    values.push(item.value);
    if (item.parent) {
      findParentValues(item.parent as CascaderItem, values);
    }
    return values;
  };
  const findParentLabels = (item: CascaderItem, values: string[] = []) => {
    values.push(item.label);
    if (item.parent) {
      findParentLabels(item.parent as CascaderItem, values);
    }
    return values;
  };
  const leafsData = filterLeafs();
  const labelsAndValues = () => {
    const suggestionList: suggestionListType[] = [];
    leafsData.forEach((item) => {
      suggestionList.push({ values: findParentValues(item, []).reverse(), labels: findParentLabels(item, []).reverse() });
    });
    suggestionList.forEach((value) => {
      value.labelsString = value.labels.join(' / ');
    });
    return suggestionList;
  };
  suggestions.value = labelsAndValues();

  const caclSuggestions = () => {
    suggestionsList.value = suggestions.value.filter((item) => {
      return item.labelsString?.toLowerCase().includes(searchText.value.toString().toLowerCase()) && !item.disabled;
    });
    isSearching.value = true;
  };

  const hideSuggestion = () => {
    isSearching.value = false;
  };

  const handleFilter = debounce((val) => {
    searchText.value = val;
    const pass = props.beforeFilter(val);
    if (isPromise(pass)) {
      (pass as Promise<unknown>).then(caclSuggestions).catch(() => {
        // catch错误
      });
    } else if (pass !== false) {
      caclSuggestions();
    } else {
      hideSuggestion();
    }
    menuShow.value = true;
  }, props.debounce);

  const handleInput = (val: string) => {
    if (!props.filterable) {
      return;
    }
    val ? handleFilter(val) : hideSuggestion();
  };

  const chooseSuggestion = (item: suggestionListType) => {
    if (props.showPath) {
      inputValue.value = item.labelsString as string;
    } else {
      const labels = (item.labelsString as string).split(' / ');
      inputValue.value = labels[labels.length - 1];
    }
    ctx.emit('update:modelValue', item.values);
    cascaderItemNeedProps.valueCache?.splice(0);
    cascaderItemNeedProps.valueCache?.splice(0, 0, ...item.values);
    initActiveIndexs(item.values, cascaderOptions[0], 0, cascaderItemNeedProps.activeIndexs as number[]);
    updateCascaderView(cascaderItemNeedProps.activeIndexs as number[], cascaderOptions[0], 0);
    menuShow.value = false;
  };
  return {
    handleInput,
    suggestionsList,
    isSearching,
    chooseSuggestion,
  };
};
