import { Ref, ref } from 'vue';
import { IInnerTreeNode, IUseCore, IUseSearchFilter, SearchFilterOption } from './use-tree-types';
import { trim } from 'lodash';
export function useSearchFilter() {
  return function useSearchFilterFn(data: Ref<IInnerTreeNode[]>, core: IUseCore): IUseSearchFilter {
    const { clearNodeMap, getExpendedTree } = core;
    const virtualListRef = ref();
    const resetNodeSearchProperty = () => {
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

    const hasDealParentNode = (pre: number, cur: number, parentIdSet: Set<unknown>) => {
      // 当访问到同一层级前已经有匹配时前一个已经处理过父节点了，不需要继续访问
      // 当访问到第一父节点的childrenMatched为true的时，不再需要向上寻找，防止重复访问
      return (
        (data.value[pre].parentId === data.value[cur].parentId && data.value[pre].isMatched) ||
        (parentIdSet.has(data.value[pre].id) && data.value[pre].childrenMatched)
      );
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
          if (!data.value[i].parentId) {
            // 没有parentId表示时根节点，不需要再向前遍历
            continue;
          }
          let L = i - 1;
          const set = new Set();
          set.add(data.value[i].parentId);
          // 没有parentId时，表示此节点的纵向parent已访问完毕
          // 没有父节点被处理过，表示时第一次向上处理当前纵向父节点
          while (L >= 0 && data.value[L].parentId && !hasDealParentNode(L, i, set)) {
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

    const hasParentNodeMatched = (pre: number, cur: number, parentIdSet: Set<unknown>) => {
      return parentIdSet.has(data.value[pre].id) && data.value[pre].isMatched;
    };

    const dealNodeHideProperty = () => {
      data.value.forEach((item, index) => {
        if (item.isMatched || item.childrenMatched) {
          item.isHide = false;
        } else {
          // 需要判断是否有父节点有匹配
          if (!item.parentId) {
            item.isHide = true;
            return;
          }
          let L = index - 1;
          const set = new Set();
          set.add(data.value[index].parentId);
          while (L >= 0 && data.value[L].parentId && !hasParentNodeMatched(L, index, set)) {
            if (set.has(data.value[L].id)) {
              set.add(data.value[L].parentId);
            }
            L--;
          }
          if (!data.value[L].parentId && !data.value[L].isMatched) {
            // 没有parentId, 说明已经访问到当前节点所在的根节点
            item.isHide = true;
          } else {
            item.isHide = false;
          }
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
      resetNodeSearchProperty();
      if (!target) {
        return;
      }
      dealMatchedData(target, option.matchKey, option.pattern);
      // 对于过滤操作，需要设置节点是否需要隐藏
      if (option.isFilter) {
        dealNodeHideProperty();
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
