/**
 * 处理传入options数据
 */
import { reactive } from 'vue';
import { CascaderItem, OptionsCallback } from '../src/cascader-types'
let cascaderOptions
export const optionsHandles = (options?: CascaderItem[]): OptionsCallback => {
  if (options) {
    cascaderOptions = reactive<[CascaderItem[]]>([ options ])
  }
  /**
   * hover时修改展示项
   * @param optionItem - 项
   * @param ulIndex - 当前选中的第几级
   * 
   */
  const changeCascaderIndexs = (optionItem: CascaderItem, ulIndex: number) => {
    if (!cascaderOptions) return
    if (optionItem?.children?.length > 0) {
      cascaderOptions[ulIndex + 1] = optionItem.children
    } else {
      // 选择的项没有子项时清除多余的ul
      cascaderOptions.splice(ulIndex + 1, cascaderOptions.length - 1 - ulIndex)
    }
  }
  return {
    cascaderOptions,
    changeCascaderIndexs
  }
}
