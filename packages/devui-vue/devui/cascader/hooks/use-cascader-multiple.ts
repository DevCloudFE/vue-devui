/**
 * 多选模式下的一些函数
 */
import { CascaderItem, CascaderValueType, UseCascaderMultipleCallback } from '../src/cascader-types'
import { reactive } from 'vue'
const multipleActiveArr = reactive<CascaderItem[]>([]) // 多选模式下选中的值数组，用于生成tag
export const useMultiple = (): UseCascaderMultipleCallback => {
  /**
   * 添加选中项
   * @param arr 当前选中的数组集合
   * @param singleItem 当前选中项
   * 
   */
  const addMultipleIptValue = (arr: CascaderItem[], singleItem: CascaderItem) => {
    arr.push(singleItem)
  }
  /**
   * 初始化选中项，将选中的数组集合置为空
   * @param arr 当前选中的数组集合
   */
  const initMultipleIptValue = (arr: CascaderItem[]) => {
    arr.splice(0, arr.length)
  }
  /**
   * 多选模式下获取选中的节点
   * @param currentOption 选中的某项
   * @param cascaderUlValues 多选集合中的某一个集合
   * @param index cascaderUlValues数组的起始项，最开始为0
   */
  const getMultipleCascaderItem = (currentOption: CascaderItem[], cascaderUlValues: number[], index: number) => {
    let nextOption = null
    // 根据value筛选出当前children中被选中的项
    for (let i = 0; i < currentOption.length; i++) {
      if (currentOption[i]?.value === cascaderUlValues[index]) {
        nextOption = currentOption[i]
        break
      }
    }
    if (nextOption?.children?.length > 0) {
      // 递归获取选中节点
      index += 1
      getMultipleCascaderItem(nextOption.children, cascaderUlValues, index)
    } else {
      // 没有子节点了则说明已经是最终节点
      addMultipleIptValue(multipleActiveArr, nextOption)
    }
  }
  /**
   * 多选模式下当有默认选中值时，初始化视图选中状态
   * 通过value集合获取下标集合
   * @param values 默认选中的value集合
   * @param currentOption 当前列
   * @param index values数组的起始项，最开始为0
   * @param activeIndexs 渲染视图所需要的下标集合
   */
  const initActiveIndexs = (values: CascaderValueType, currentOption: CascaderItem[], index: number, activeIndexs: number[]) => {
    let nextOption = null
    for (let i = 0; i < currentOption.length; i++) {
      if (currentOption[i]?.value === values[index]) {
        nextOption = currentOption[i]?.children
        activeIndexs[index] = i
        break
      }
    }
    if (index < values.length - 1 && nextOption) {
      index += 1
      initActiveIndexs(values, nextOption, index, activeIndexs)
    }
  }
  return {
    multipleActiveArr,
    addMultipleIptValue,
    initMultipleIptValue,
    getMultipleCascaderItem,
    initActiveIndexs
  }
}
