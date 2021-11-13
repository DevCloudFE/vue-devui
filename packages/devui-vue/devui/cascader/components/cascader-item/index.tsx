import { computed, ref } from 'vue'
import { useClassName } from './use-class'
import { CascaderItemPropsType } from '../cascader-list/cascader-list-types'
import { useSingle } from '../../hooks/use-cascader-single'
import { useMultiple } from '../../hooks/use-cascader-multiple'
import './index.scss'
export const DCascaderItem = (props: CascaderItemPropsType) => {
  // console.log('item index',props)
  const { cascaderItem, ulIndex, liIndex, cascaderItemNeedProps, cascaderOptions } = props
  const { multiple, stopDefault, valueCache, activeIndexs, trigger, confirmInputValueFlg, tagList} = cascaderItemNeedProps
  const isTriggerHover = trigger === 'hover'
  const { singleChoose } = useSingle()
  const { updateCheckOptionStatus } = useMultiple(cascaderItemNeedProps)
  const { getRootClass } = useClassName()
  const disbaled = computed(() => cascaderItem?.disabled) // 当前项是否被禁用
  const rootClasses = getRootClass(props)
  // 触发联动更新
  const updateValues = () => {
    if (stopDefault.value) return
    // 删除当前联动级之后的所有级
    activeIndexs.splice(ulIndex, activeIndexs.length - ulIndex)
    // 更新当前渲染视图的下标数组
    activeIndexs[ulIndex] = liIndex
    // console.log('activeIndexs更新', activeIndexs)
    if (!multiple) { // 单选点击选项就更新，多选是通过点击checkbox触发数据更新
      singleChoose(ulIndex, valueCache, cascaderItem)
    }
  }
  // 鼠标hover（多选模式下只能点击操作触发）
  const mouseEnter = () => {
    if (disbaled.value || multiple) return
    updateValues()
  }
  const mouseenter = {
    [ isTriggerHover && 'onMouseenter' ]: mouseEnter
  }
  // 鼠标click
  const mouseClick = () => {
    if (disbaled.value) return
    updateValues()
    if (!multiple && (!cascaderItem.children || cascaderItem?.children?.length === 0)) {
      confirmInputValueFlg.value = !confirmInputValueFlg.value
    }
  }
  const checkboxChange = () => {
    updateCheckOptionStatus(cascaderItem, cascaderOptions, ulIndex, tagList)
    // const parentNode = getParentNode(cascaderItem.value, cascaderOptions, ulIndex - 1)
    // updateParentNodeStatus(parentNode, cascaderOptions, ulIndex - 1)
    // if (!cascaderItem.children || cascaderItem?.children?.length === 0) {
    //   confirmInputValueFlg.value = !confirmInputValueFlg.value
    // }
  }
  return (
    <li class={rootClasses.value}>
      { multiple && 
        <div class="cascader-li__checkbox">
          <d-checkbox checked={cascaderItem?.checked} disabled={cascaderItem.disabled} halfchecked={cascaderItem?.halfChecked} onChange={checkboxChange}/>
        </div>
      }
      <div class="cascader-li__wraper" {...mouseenter} onClick={mouseClick}>
        { cascaderItem.icon &&
          <div class={'cascader-li__icon' + (cascaderItem.disabled ? ' disabled' : '')}>
            <d-icon name={ cascaderItem.icon } size="inherit"></d-icon>
          </div>
        }
        <div class="dropdown-item-label">
          <span>{ cascaderItem.label }</span>
        </div>
        {
          cascaderItem?.children?.length > 0 && <d-icon name="chevron-right" size="16px" color="inherit"></d-icon>
        }
      </div>
    </li>
  )
}
