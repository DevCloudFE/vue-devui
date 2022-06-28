import { debounce, cloneDeep } from 'lodash';
import { ref, SetupContext } from 'vue';
import { initActiveIndexs } from '../hooks/use-cascader-single';
import { CascaderItem, CascaderValueType, CascaderulProps } from '../src/cascader-types';
export const useCascader = (props: CascaderulProps, ctx: SetupContext, menuShow, inputValue, cascaderOptions, cascaderItemNeedProps) => {
  const suggestions = ref([]);
  const suggestionsList = ref([]);
  const isSearching = ref(false);

  const setChildrenParent = (parentNode) => {
    parentNode?.children.forEach((child) => {
      child.parent = parentNode;
      if (parentNode.disabled) {
        child.disabled = true;
      }
    });
    return parentNode;
  };

  const addParent = (data) => {
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
  const flatNodes = (data = []) => {
    return data.reduce((res, node) => {
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

  const findParentValues = (item: CascaderItem, values = []) => {
    values.push(item.value);
    if (item.parent) {
      findParentValues(item.parent, values);
    }
    return values;
  };
  const findParentLabels = (item: CascaderItem, values = []) => {
    values.push(item.label);
    if (item.parent) {
      findParentLabels(item.parent, values);
    }
    return values;
  };
  const leafsData = filterLeafs();
  const labelsAndValues = () => {
    const values = [];
    leafsData.forEach((item) => {
      values.push({ values: findParentValues(item, []).reverse(), labels: findParentLabels(item, []).reverse() });
    });
    values.forEach((value) => {
      value.labelsString = value.labels.join('/');
    });
    return values;
  };
  suggestions.value = labelsAndValues();

  const caclSuggestions = (val) => {
    suggestionsList.value = suggestions.value.filter((item) => {
      return item.labelsString.toLowerCase().includes(val.toString().toLowerCase()) && !item.disabled;
    });
    isSearching.value = true;
  };

  const handleFilter = debounce((val) => {
    caclSuggestions(val);
    menuShow.value = true;
  }, props.debounce);

  const hideSuggestion = () => {
    isSearching.value = false;
  };

  const handleInput = (val: string) => {
    val ? handleFilter(val) : hideSuggestion();
  };

  const updateCascaderView = (value: CascaderValueType, currentOption: CascaderItem[], index: number) => {
    if (index === value.length) {
      return;
    }
    const i = value[index] as number;
    // 当前的子级
    const current = currentOption[i];
    const children = current?.children;
    if (children?.length > 0) {
      // 为下一级增添数据
      cascaderOptions[index + 1] = children;
      // 递归添加
      updateCascaderView(value, children, index + 1);
    } else {
      // 当最新的ul(级)没有下一级时删除之前选中ul的数据
      cascaderOptions.splice(index + 1, cascaderOptions.length - 1);
    }
  };

  const chooseSuggestion = (item: CascaderItem) => {
    if (props.showPath) {
      inputValue.value = item.labelsString;
    } else {
      const labels = item.labelsString.split('/');
      inputValue.value = labels[labels.length - 1];
    }
    ctx.emit('update:modelValue', item.values);
    cascaderItemNeedProps.valueCache.splice(0);
    cascaderItemNeedProps.valueCache.splice(0, 0, ...item.values);
    initActiveIndexs(item.values, cascaderOptions[0], 0, cascaderItemNeedProps.activeIndexs);
    updateCascaderView(cascaderItemNeedProps.activeIndexs, cascaderOptions[0], 0);
    menuShow.value = false;
  };
  return {
    handleInput,
    suggestionsList,
    isSearching,
    chooseSuggestion,
  };
};
