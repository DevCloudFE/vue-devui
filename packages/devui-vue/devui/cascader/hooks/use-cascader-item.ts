/**
 * 处理cascader-item中需要的参数
 */
import { CascaderProps, UseCascaderItemCallback, CascaderItem } from '../src/cascader-types'
import { ref, reactive, Ref } from 'vue'
import { cloneDeep } from 'lodash-es'

export const useCascaderItem = (props: CascaderProps, stopDefault: Ref<boolean>): UseCascaderItemCallback => {
  /**
   * 传递给cascader-item/index.ts组件的数据
   */
  const cascaderItemNeedProps = {
    trigger: props.trigger,
    inputValueCache: ref(''),
    confirmInputValueFlg: ref(false), // 用于监听点击确定时输出选择内容
    valueCache: reactive(cloneDeep(props.value)), // 操作时缓存选中的值
    value: reactive(cloneDeep(props.value)), // 每级的value
    multiple: props.multiple,
    activeIndexs: reactive<number[]>([]), // 维护用于视图更新的选中下标
    stopDefault,
  }
  /**
   * 下拉框中输出内容
   * 需要判断是否是多选
   * 需要判断单选模式下是否showPath
   * @param label 当前current的内容
   * @param arr 当前选中项current的children数组
   */
    const getInputValue = (label: string, arr?: CascaderItem[]) => {
      if (!props.showPath) {
        cascaderItemNeedProps.inputValueCache.value = label
      } else {
        cascaderItemNeedProps.inputValueCache.value += (label + (arr?.length > 0 ? ' / ' : ''))
      }
    }
  return {
    cascaderItemNeedProps,
    getInputValue
  }
}