import { ref, Ref, SetupContext } from 'vue';
import { FormatterType, SearchFnType, SourceType,SourceItemObj } from '../auto-complete-types';
export default function useSearchFn(
  ctx: SetupContext,
  allowEmptyValueSearch: Ref<boolean>,
  source: Ref<SourceType>,
  searchFn: Ref<SearchFnType>,
  formatter: Ref<FormatterType>
): {
    handleSearch: (term: string, enableLazyLoad?: boolean) => Promise<void>;
    recentlyFocus: (latestSource: Array<SourceItemObj>) => void;
    searchList: Ref<SourceType>;
    showNoResultItemTemplate: Ref<boolean>;
  } {
  const searchList = ref<SourceType>([]);
  const showNoResultItemTemplate = ref(false);
  const defaultSearchFn = (term: string) => {
    type ItemType = typeof source.value[0];
    const arr: ItemType[] = [];
    source.value.forEach((item) => {
      let cur = formatter.value((item as ItemType));
      cur = cur.toLowerCase();
      if (cur.startsWith(term)) {
        arr.push(item);
      }
    });
    return arr as SourceType;
  };
  const handleSearch = async (term: string,enableLazyLoad=false) => {
    if (term === ''&&!allowEmptyValueSearch.value) {
      searchList.value = [];
      showNoResultItemTemplate.value=false;
      return;
    }
    let arr: SourceType = [];
    term = term.toLowerCase();
    if(enableLazyLoad) {
      arr = source.value;
    }else if (!searchFn.value) {
      arr = defaultSearchFn(term);
    } else {
      arr = await searchFn.value(term);
    }
    searchList.value = arr;
    if(searchList.value.length===0){
      showNoResultItemTemplate.value=true;
    }else{
      showNoResultItemTemplate.value=false;
    }
  };
  const recentlyFocus = (latestSource: Array<SourceItemObj>) => {
    if(latestSource) {
      searchList.value = latestSource;
    }
  };
  return {
    handleSearch,
    recentlyFocus,
    searchList,
    showNoResultItemTemplate
  };
}
