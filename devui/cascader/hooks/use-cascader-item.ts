/**
 * 处理cascader-item中需要的参数
 */
import { CascaderProps, UseCascaderItemCallback, CascaderValueType } from '../src/cascader-types'
import { ref } from 'vue'
export const useCascaderItem = (props: CascaderProps, value: CascaderValueType): UseCascaderItemCallback => {

  const cascaderItemNeedProps = {
    trigger: props.trigger,
    inputValueCache: ref(''),
    confirmInputValueFlg: ref(false), // 用于监听点击确定时输出选择内容
    value,
  }
  return {
    cascaderItemNeedProps
  }
}