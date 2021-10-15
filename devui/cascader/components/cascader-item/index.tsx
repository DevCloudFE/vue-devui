import { getRootClass } from './use-class'
import { optionsHandles } from '../../hooks/use-cascader-options'
import { CascaderItem } from '../../src/cascader-types'
import { CascaderulProps } from '../cascader-list/cascader-list-types'
import './index.scss'
interface CascaderItemPropsType extends CascaderulProps {
  cascaderItem: CascaderItem
  liIndex: number
}
export const DCascaderItem = (props: CascaderItemPropsType) => {
  console.log(props)
  const { cascaderItem, ulIndex, cascaderOptions, liIndex } = props
  const { changeCascaderIndexs } = optionsHandles(cascaderOptions)
  const rootClasses = getRootClass()
  const triggerHover = props.cascaderItemNeedProps.trigger === 'hover'
  const updateValues = () => {
    console.log(liIndex)
    // props.value[ulIndex] = liIndex
    // props.value.splice(0, ulIndex, ulIndex)
  }
  const mouseEnter = () => {
    updateValues()
    changeCascaderIndexs(cascaderItem, ulIndex)
  }
  const mouseenter = {
    [ triggerHover && 'onMouseenter']: mouseEnter
  }
  const mouseClick = () => {
    updateValues()
    if (triggerHover && cascaderItem?.children?.length === 0) {

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
