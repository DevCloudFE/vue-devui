import { ref, Ref, SetupContext } from 'vue';
import { DefaultFuncType,FormatterType,HandleSearch,SelectValueType,SourceItemObj, SourceType } from '../auto-complete-types';

export default function useSelectHandle(
  ctx: SetupContext,
  searchList: Ref<SourceType>,
  selectValue: Ref<SelectValueType>,
  handleSearch: HandleSearch,
  formatter: Ref<FormatterType>,
  handleClose: DefaultFuncType
): {
    selectedIndex: Ref<number>;
    selectOptionClick: (item: string | SourceItemObj) => Promise<void>;
  } {
  const selectedIndex = ref(0);
  const getListIndex = (cur: string) => {
    if (searchList.value.length === 0) {
      return 0;
    }
    let ind = 0;
    searchList.value.forEach((item,index)=>{
      if(typeof item ==='string'){
        if(item === cur){
          ind = index;
        }
      }else{
        if(String(item.label) === cur){
          ind = index;
        }
      }
    });
    return ind === -1 ? 0 : ind;
  };
  const selectOptionClick = async (item: string | SourceItemObj) => {
    const cur = formatter.value(item);
    ctx.emit('update:modelValue', cur);
    handleClose();
    await handleSearch(cur);
    selectedIndex.value = getListIndex(cur);
    selectValue.value && selectValue.value(cur);
  };
  return {
    selectedIndex,
    selectOptionClick
  };
}
