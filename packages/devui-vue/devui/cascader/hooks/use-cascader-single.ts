import { Ref } from 'vue'
import { CascaderValueType, CascaderItem } from '../src/cascader-types'
export const useSingle = () => {
  /**
   * 单选模式初始化
   */
  const initSingleIptValue = (inputValueCache: Ref<string>) => {
    inputValueCache.value = ''
  }

  /**
   * 单选模式选中
   */
  const singleChoose = (ulIndex: number, valueCache: CascaderValueType, cascaderItem: CascaderItem) => {
      // 删除当前联动级之后的所有级
      valueCache.splice(ulIndex, valueCache.length - ulIndex)
      // 更新当前active的value数组
      valueCache[ulIndex] = cascaderItem?.value as number
  }
  return {
    initSingleIptValue,
    singleChoose
  }
}