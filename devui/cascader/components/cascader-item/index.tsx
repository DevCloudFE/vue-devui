import { getRootClass } from './use-class'
import { optionsHandles } from '../../hooks/use-cascader-options'
import './index.scss'
export const DCascaderItem = (props) => {
  const { cascaderli, ulIndex } = props
  const { changeCascaderIndexs } = optionsHandles()
  const rootClasses = getRootClass()
  const mouseHover = () => {
    changeCascaderIndexs(cascaderli, ulIndex)
  }
  return (
    <li class={rootClasses.value} onMouseover={mouseHover}>
      <div class="dropdown-item-label">
        <span>{ cascaderli.label }</span>
      </div>
      {
        cascaderli?.children?.length > 0 && <d-icon name="chevron-right" size="16px" color="inherit"></d-icon>
      }
    </li>
  )
}
