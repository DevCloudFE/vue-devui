/**
 * 处理cascader-item中需要的参数
 */
import { CascaderProps, UseCascaderItemCallback } from '../src/cascader-types'
import { ref, reactive } from 'vue'
export const useCascaderItem = (props: CascaderProps): UseCascaderItemCallback => {

  const cascaderItemNeedProps = {
    trigger: props.trigger,
    inputValueCache: ref(''),
    confirmInputValueFlg: ref(false), // 用于监听点击确定时输出选择内容
    value: reactive(props.value),
  }
  return {
    cascaderItemNeedProps
  }
}