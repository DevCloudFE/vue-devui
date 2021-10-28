import { getRootClass } from './use-class'
import { CascaderItemPropsType } from '../cascader-list/cascader-list-types'
import { computed } from 'vue'
import './index.scss'
export const DCascaderItem = (props: CascaderItemPropsType) => {
  console.log('item index',props)
  const { cascaderItem, ulIndex, liIndex, cascaderItemNeedProps } = props
  const { multiple, value } = cascaderItemNeedProps
  const disbaled = computed(() => cascaderItem?.disabled) // 当前项是否被禁用
  const rootClasses = getRootClass(props)
  const triggerHover = cascaderItemNeedProps.trigger === 'hover'
  // 触发联动更新
  const updateValues = () => {
    if (!multiple) {
      // 单选模式
      // 删除当前联动级之后的所有级
      cascaderItemNeedProps.value.splice(ulIndex, cascaderItemNeedProps.value.length - ulIndex)
      // 更新当前active的value数组
      cascaderItemNeedProps.value[ulIndex] = liIndex
    } else {
      // 多选模式
      console.log(cascaderItemNeedProps.value)
    }
  }
  // 鼠标hover（多选模式下只能点击操作触发）
  const mouseEnter = () => {
    if (disbaled.value || multiple) return
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
      <div class="cascader-li__checkbox">
        <d-checkbox/>
      </div>
      { cascaderItem.icon &&
        <div class="cascader-li__icon">
          <d-icon name={ cascaderItem.icon } size="inherit"></d-icon>
        </div>
      }
      <div class="dropdown-item-label">
        <span>{ cascaderItem.label }</span>
      </div>
      {
        cascaderItem?.children?.length > 0 && <d-icon name="chevron-right" size="16px" color="inherit"></d-icon>
      }
    </li>
  )
}
