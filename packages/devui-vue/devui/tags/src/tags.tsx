import { defineComponent, ref, toRefs, computed } from 'vue'
import { tagsProps, TagsProps } from './tags-types'
import { useStyle } from './hooks'
import './tags.scss'
// 类型声明

export default defineComponent({
  name: 'DTags',
  props: tagsProps,
  emits: [],
  setup(props: TagsProps, { slots }) {
    //获取type对应样式
    const tagClass = useStyle(props)

    return () => (
      <div class="devui-tags">
        <span class={tagClass.value} style="display: block;">
          {slots.default?.()}
        </span>
      </div>
    )
  }
})
/* 
<d-tag>
<span  class="devui-tag-item" title="default color" style="display: block;">
<div  class="content-wrapper"></div>
<span  class="ng-star-inserted">default color</span>
</span>
</d-tag>
*/
