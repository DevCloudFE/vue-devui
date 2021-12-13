import { reactive, ref, Ref, SetupContext } from "vue";
import { ConnectionPosition } from "../auto-complete-types";

export default function useSelectHandle(ctx: SetupContext,searchList: Ref<Array<any>>, selectValue: Function, handleSearch: Function,formatter: Function): any {
  const selectedIndex = ref(0)
  //todo 参数还没确定 后期需要约束data类型 disabledKey:String, 
  const getListIndex = (item: string) => {
    if (searchList.value.length == 0) {
      return 0
    }
    let ind = searchList.value.indexOf(item)
    return ind == -1 ? 0 : ind
  }
  // todo 键盘方向键选择回车键选择功能
  const selectOptionClick = ({index,item}) => {
    const cur = formatter(item)
    ctx.emit('update:modelValue', cur)
    handleSearch(cur)
    selectedIndex.value = getListIndex(cur)
    selectValue && selectValue()
  }
  return {
    selectedIndex,
    selectOptionClick
  }
}