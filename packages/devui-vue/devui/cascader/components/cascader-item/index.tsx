import { useClassName } from './use-class'
import { CascaderItemPropsType } from '../cascader-list/cascader-list-types'
import { computed, ref } from 'vue'
import { useSingle } from '../../hooks/use-cascader-single'
import { useMultiple } from '../../hooks/use-cascader-multiple'
import './index.scss'
import checkbox from '../../../checkbox/src/checkbox'
export const DCascaderItem = (props: CascaderItemPropsType) => {
  // console.log('item index',props)
  const { cascaderItem, ulIndex, liIndex, cascaderItemNeedProps } = props
  const { multiple, stopDefault, valueCache, activeIndexs, trigger, confirmInputValueFlg } = cascaderItemNeedProps
  const triggerHover = trigger === 'hover'
  const { singleChoose } = useSingle()
  const { clickCheckbox } = useMultiple()
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
    if (multiple) {
      // clickCheckbox()
    } else {
      singleChoose(ulIndex, valueCache, cascaderItem)
    }
  }
  // 鼠标hover（多选模式下只能点击操作触发）
  const mouseEnter = () => {
    if (disbaled.value || multiple) return
    updateValues()
  }
  const mouseenter = {
    [ triggerHover && 'onMouseenter' ]: mouseEnter
  }
  // 鼠标click
  const mouseClick = () => {
    if (disbaled.value) return
    updateValues()
    if (!cascaderItem.children || cascaderItem?.children?.length === 0) {
      confirmInputValueFlg.value = !confirmInputValueFlg.value
    }
  }
  const checkboxChange = (e) => {
    console.log(123)
  }
  return (
    <li class={rootClasses.value} {...mouseenter} onClick={mouseClick}>
      { multiple && 
        <div class="cascader-li__checkbox">
          <d-checkbox checked={cascaderItem?.checked} halfchecked={cascaderItem?.halfchecked} onChange={checkboxChange}/>
        </div>
      }
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
