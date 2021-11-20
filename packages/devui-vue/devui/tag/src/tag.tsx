import { defineComponent, ref } from 'vue'
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
    const themeColor = useColor(props)
    const tagTitle = props.titleContent || ''
    const type = props.type
    const color = props.color
    const checked = ref(props.checked)
    const change = () => {
      checked.value = !checked.value
    }
    return () => (
      <div class='devui-tag' onClick={change}>
        <span
          class={tagClass.value}
          style={{
            display: 'block',
            color: checked.value ? '#fff' : themeColor.value,
            backgroundColor: checked.value ? themeColor.value : type ? '' : !color ? '' : '#fff'
          }}
          title={tagTitle}
        >
          {slots.default?.()}
        </span>
      </div>
    )
  }
})
