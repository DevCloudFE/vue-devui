import { getRootClass } from './use-class'
import { optionsHandles } from '../../hooks/use-cascader-options'
import './index.scss'
export const DCascaderItem = (props) => {
  // console.log(props)
  const { cascaderItem, ulIndex } = props
  const { changeCascaderIndexs } = optionsHandles()
  const rootClasses = getRootClass()
  const mouseEvent = () => {
    changeCascaderIndexs(cascaderItem, ulIndex)
  }
  const onMouseEvent = {
    [props.cascaderItemNeedProps.trigger === 'hover' ? 'onMouseenter' : 'onClick']: mouseEvent
  } 
  return (
    <li class={rootClasses.value} {...onMouseEvent}>
      <div class="dropdown-item-label">
        <span>{ cascaderItem.label }</span>
      </div>
      {
        cascaderItem?.children?.length > 0 && <d-icon name="chevron-right" size="16px" color="inherit"></d-icon>
      }
    </li>
  )
}
