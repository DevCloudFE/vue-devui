/**
 * 处理cascader-item中需要的参数
 */
import { CascaderProps, UseCascaderItemCallback } from '../src/cascader-types'
import { ref, reactive, Ref } from 'vue'
import { cloneDeep } from 'lodash-es'

export const useCascaderItem = (props: CascaderProps, stopDefault: Ref<boolean>): UseCascaderItemCallback => {
  const cascaderItemNeedProps = {
    trigger: props.trigger,
    inputValueCache: ref(''),
    confirmInputValueFlg: ref(false), // 用于监听点击确定时输出选择内容
    value: reactive(cloneDeep(props.value)), // 每级的value
    multiple: props.multiple,
    stopDefault,
  }
  return {
    cascaderItemNeedProps
  }
}