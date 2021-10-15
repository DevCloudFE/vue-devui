/**
 * 处理cascader-item中需要的参数
 */
import { CascaderProps, UseCascaderItemCallback } from '../src/cascader-types'
export const userCascaderItem = (props: CascaderProps): UseCascaderItemCallback => {
  const cascaderItemNeedProps = {
    trigger: props.trigger
  }
  return {
    cascaderItemNeedProps
  }
}