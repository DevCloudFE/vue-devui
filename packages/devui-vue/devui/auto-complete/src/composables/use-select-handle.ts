import { ref, Ref, SetupContext } from "vue";

export default function useSelectHandle(ctx: SetupContext,searchList: Ref<Array<any>>, selectValue: Ref<Function>, handleSearch: Function,formatter: Ref<Function>,handleClose:Function): any {
  const selectedIndex = ref(0)
  const getListIndex = (item: string) => {
    if (searchList.value.length == 0) {
      return 0
    }
    let ind = searchList.value.indexOf(item)
    return ind == -1 ? 0 : ind
  }
  const selectOptionClick = async(item) => {
    const cur = formatter.value(item)
    ctx.emit('update:modelValue', cur)
    handleClose()
    await handleSearch(cur)
    selectedIndex.value = getListIndex(cur)
    selectValue.value && selectValue.value()
  }
  return {
    selectedIndex,
    selectOptionClick
  }
}