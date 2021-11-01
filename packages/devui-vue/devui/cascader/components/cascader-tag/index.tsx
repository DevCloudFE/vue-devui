/**
 * 多选模式下的内容框中的选中tag
 * tag组件还未开发完成，所以暂时使用自定义组件
 */
import { CascaderItem } from '../../src/cascader-types'
import './index.scss'
interface PropsType {
  item: CascaderItem
}
export const DTag = (props: PropsType) => {
  const { item } = props
  return (
    <div class="devui-tag">
      <span>{ item?.label }</span>
      <div class="devui-tag__close">
        <d-icon name="close"></d-icon>
      </div>
    </div>
  )
}