import { ref, Ref, SetupContext } from 'vue';
import { DefaultFuncType,FormatterType,HandleSearch } from '../auto-complete-types';

export default function useSelectHandle(ctx: SetupContext,searchList: Ref<Array<any>>, selectValue: Ref<DefaultFuncType>, handleSearch: HandleSearch,formatter: Ref<FormatterType>,handleClose: DefaultFuncType): any {
  const selectedIndex = ref(0);
  const getListIndex = (item: string) => {
    if (searchList.value.length == 0) {
      return 0;
    }
    const ind = searchList.value.indexOf(item);
    return ind == -1 ? 0 : ind;
  };
  const selectOptionClick = async(item: any) => {
    const cur = formatter.value(item);
    ctx.emit('update:modelValue', cur);
    handleClose();
    await handleSearch(cur);
    selectedIndex.value = getListIndex(cur);
    selectValue.value && selectValue.value();
  };
  return {
    selectedIndex,
    selectOptionClick
  };
}
