import { ref, Ref, SetupContext } from 'vue';
import { FormatterType, SearchFnType } from '../auto-complete-types';
export default function useSearchFn(ctx: SetupContext,allowEmptyValueSearch: Ref<boolean>,source: Ref<Array<any>>,searchFn: Ref<SearchFnType>,formatter: Ref<FormatterType>): any {
  const searchList = ref([]);
  const showNoResultItemTemplate = ref(false);
  const handleSearch = async (term: string,enableLazyLoad: boolean) => {
    if (term == ''&&!allowEmptyValueSearch.value) {
      searchList.value = [];
      showNoResultItemTemplate.value=false;
      return;
    }
    let arr = [];
    term = term.toLowerCase();
    if(enableLazyLoad) {
      arr = source.value;
    }else if (!searchFn.value) {
      source.value.forEach((item) => {
        let cur = formatter.value(item);
        cur = cur.toLowerCase();
        if (cur.startsWith(term)) {
          arr.push(item);
        }
      });
    } else {
      arr = await searchFn.value(term);
    }
    searchList.value = arr;
    if(searchList.value.length==0){
      showNoResultItemTemplate.value=true;
    }else{
      showNoResultItemTemplate.value=false;
    }
  };
  const recentlyFocus = (latestSource: Array<any>) => {
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
