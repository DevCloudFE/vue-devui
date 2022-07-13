import { Ref, ref } from 'vue';
import { IInnerTreeNode, IUseCore, IUseSearchFilter, SearchFilterOption } from './use-tree-types';
import { trim } from 'lodash';
export default function () {
  return function useSearchFilter(data: Ref<IInnerTreeNode[]>, core: IUseCore): IUseSearchFilter {
    const { clearNodeMap, getExpendedTree } = core;
    const virtualListRef = ref();
    const resetTreeData = () => {
      data.value.forEach((item) => {
        item.childrenMatched = false;
        item.isHide = false;
        item.isMatched = false;
        item.matchedText = '';
      });
      if (virtualListRef.value) {
        virtualListRef.value.scrollTo(0);
      }
    };

    const dealMatchedData = (target: string, matchKey: string | undefined, pattern: RegExp | undefined) => {
      const trimmedTarget = trim(target).toLocaleLowerCase();
      for (let i = 0; i < data.value.length; i++) {
        const key = matchKey ? data.value[i][matchKey] : data.value[i].label;
        const selfMatched = pattern ? pattern.test(key) : key.toLocaleLowerCase().includes(trimmedTarget);
        data.value[i].isMatched = selfMatched;
        // 需要向前找父节点，处理父节点的childrenMatched、expand参数(子节点匹配到时，父节点需要展开)
        if (selfMatched) {
          data.value[i].matchedText = matchKey ? data.value[i].label : trimmedTarget;
          let L = i - 1;
          const set = new Set();
          if (data.value[i].parentId) {
            set.add(data.value[i].parentId);
          }
          // 没有parentId时，表示此节点的纵向parent已访问完毕
          // 当访问到第一个childrenMatched为true的节点时，不在需要向上寻找，防止重复访问
          while (L >= 0 && data.value[L].parentId && !data.value[L].childrenMatched) {
            if (set.has(data.value[L].id)) {
              data.value[L].childrenMatched = true;
              data.value[L].expanded = true;
              set.add(data.value[L].parentId);
            }
            L--;
          }
          // 循环结束时需要额外处理根节点一层
          if (L >= 0 && !data.value[L].parentId && set.has(data.value[L].id)) {
            data.value[L].childrenMatched = true;
            data.value[L].expanded = true;
          }
        }
      }
    };

    const dealHideData = () => {
      data.value.forEach((item) => {
        if (!item.isMatched && !item.childrenMatched) {
          item.isHide = true;
        }
      });
    };

    const getFirstMatchIndex = (): number => {
      let index = 0;
      const showTreeData = getExpendedTree().value;
      while (index <= showTreeData.length - 1 && !showTreeData[index].isMatched) {
        index++;
      }
      return index >= showTreeData.length ? 0 : index;
    };

    const searchTree = (target: string, option: SearchFilterOption): void => {
      // 搜索前需要先将nodeMap清空, 重置搜索相关参数
      clearNodeMap();
      resetTreeData();
      if (!target) {
        return;
      }
      dealMatchedData(target, option.matchKey, option.pattern);
      // 对于过滤操作，需要设置节点是否需要隐藏
      if (option.isFilter) {
        dealHideData();
      }
      // 虚拟滚动，需要得到第一个匹配的节点，然后滚动至该节点
      if (virtualListRef.value) {
        const scrollIndex = getFirstMatchIndex();
        virtualListRef.value.scrollTo(scrollIndex);
      }
    };

    return {
      virtualListRef,
      searchTree,
    };
  };
}
