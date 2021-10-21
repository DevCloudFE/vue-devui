import { getRootClass } from './use-class'
import { CascaderItemPropsType } from '../cascader-list/cascader-list-types'
import { computed } from 'vue'
import './index.scss'
export const DCascaderItem = (props: CascaderItemPropsType) => {
  // console.log('item index',props)
  const { cascaderItem, ulIndex, liIndex, cascaderItemNeedProps } = props
  const disbaled = computed(() => cascaderItem?.disabled) // 当前项是否被禁用
  const rootClasses = getRootClass(props)
  const triggerHover = cascaderItemNeedProps.trigger === 'hover'
  const updateValues = () => {
    // 删除当前联动级之后的所有级
    cascaderItemNeedProps.value.splice(ulIndex, cascaderItemNeedProps.value.length - ulIndex)
    // 更新当前active的value数组
    cascaderItemNeedProps.value[ulIndex] = liIndex
  }
  // 鼠标hover
  const mouseEnter = () => {
    if (disbaled.value) return
    updateValues()
  }
  const mouseenter = {
    [ triggerHover && 'onMouseenter']: mouseEnter
  }
  // 鼠标click
  const mouseClick = () => {
    if (disbaled.value) return
    updateValues()
    if (!cascaderItem.children || cascaderItem?.children?.length === 0) {
      cascaderItemNeedProps.confirmInputValueFlg.value = !cascaderItemNeedProps.confirmInputValueFlg.value
    }
  }
  return (
    <li class={rootClasses.value} {...mouseenter} onClick={mouseClick}>
      <div class="dropdown-item-label">
        <span>{ cascaderItem.label }</span>
      </div>
      {
        cascaderItem?.children?.length > 0 && <d-icon name="chevron-right" size="16px" color="inherit"></d-icon>
      }
    </li>
  )
}
