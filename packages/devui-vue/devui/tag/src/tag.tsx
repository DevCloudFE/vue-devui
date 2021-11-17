import { defineComponent } from 'vue'
import { tagProps, TagProps } from './tag-types'
import { useClass, useColor } from './hooks'
import './tag.scss'
// 类型声明

export default defineComponent({
  name: 'DTag',
  props: tagProps,
  emits: [],
  setup(props: TagProps, { slots }) {
    const tagClass = useClass(props)
    const tagColor = useColor(props)
    const tagTitle = props.titleContent || ''

    return () => (
      <div class='devui-tag'>
        <span
          class={tagClass.value}
          style={{ ...tagColor.value, display: 'block' }}
          title={tagTitle}
        >
          {slots.default?.()}
        </span>
      </div>
    )
  }
})
