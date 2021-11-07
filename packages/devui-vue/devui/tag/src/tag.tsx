import { defineComponent, ref, toRefs, computed } from 'vue'
import { tagProps, TagProps } from './tag-types'
import { useStyle } from './hooks'
import './tag.scss'
// 类型声明

export default defineComponent({
  name: 'DTag',
  props: tagProps,
  emits: [],
  setup(props: TagProps, { slots }) {
    //获取type对应样式
    const tagClass = useStyle(props)

    return () => (
      <div class="devui-tag">
        <span class={tagClass.value} style="display: block;">
          {slots.default?.()}
        </span>
      </div>
    )
  }
})
