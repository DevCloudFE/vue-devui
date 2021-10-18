import { getRootClass } from './use-class'
import { optionsHandles } from '../../hooks/use-cascader-options'
import { CascaderItem, CascaderItemNeedType } from '../../src/cascader-types'
import { CascaderulProps } from '../cascader-list/cascader-list-types'
import './index.scss'
interface CascaderItemPropsType extends CascaderulProps {
  cascaderItem: CascaderItem
  liIndex: number
  cascaderItemNeedProps: CascaderItemNeedType
}
export const DCascaderItem = (props: CascaderItemPropsType) => {
  // console.log('item index',props)
  const { cascaderItem, ulIndex, cascaderOptions, liIndex, cascaderItemNeedProps } = props
  const { changeCascaderIndexs } = optionsHandles(cascaderOptions)
  const rootClasses = getRootClass()
  const triggerHover = props.cascaderItemNeedProps.trigger === 'hover'
  const updateValues = () => {
    // 删除当前联动级之后的所有级
    cascaderItemNeedProps.value.splice(ulIndex, cascaderItemNeedProps.value.length - ulIndex)
    // 更新当前active的value数组
    cascaderItemNeedProps.value[ulIndex] = liIndex
  }
  // 展开或改变下一级列表
  const changeCascader = () => {
    // changeCascaderIndexs(cascaderItem, ulIndex)
  }
  // 鼠标hover
  const mouseEnter = () => {
    updateValues()
    changeCascader()
  }
  const mouseenter = {
    [ triggerHover && 'onMouseenter']: mouseEnter
  }
  // 鼠标click
  const mouseClick = () => {
    updateValues()
    changeCascader()
    console.log(cascaderItem)
    if (triggerHover && (!cascaderItem.children || cascaderItem?.children?.length === 0)) {
      console.log('确定')
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
