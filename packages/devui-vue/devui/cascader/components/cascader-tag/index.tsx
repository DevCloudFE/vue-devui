/**
 * 多选模式下的内容框中的选中tag
 * tag组件还未开发完成，所以暂时使用自定义组件
 */
import { CascaderItem } from '../../src/cascader-types'
import { useMultiple } from '../../hooks/use-cascader-multiple'
import './index.scss'
interface PropsType {
  tag: CascaderItem
  tagList: CascaderItem[]
}
export const DTag = (props: PropsType) => {
  const { tagList, tag } = props
  const { deleteTagList } = useMultiple()
  const deleteCurrentTag = (e: Event) => {
    e.stopPropagation()
    deleteTagList(tagList, tag)
  }
  return (
    <div class="devui-tag">
      <span>{ tag?.label }</span>
      <div class="devui-tag__close" onClick={deleteCurrentTag}>
        <d-icon name="close"></d-icon>
      </div>
    </div>
  )
}