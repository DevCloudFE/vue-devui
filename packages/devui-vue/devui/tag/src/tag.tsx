import { defineComponent, ref, toRefs } from 'vue'
import { tagProps, TagProps } from './tag-types'
import { useClass, useColor } from './hooks'
import './tag.scss'
// 类型声明

export default defineComponent({
  name: 'DTag',
  props: tagProps,
  emits: ['click'],
  setup(props: TagProps, { slots, emit }) {
    const { type, color, checked: ischecked, titleContent } = toRefs(props)
    const tagClass = useClass(props)
    const themeColor = useColor(props)
    const tagTitle = titleContent.value || ''
    const checked = ref(ischecked)
    // 子组件的点击事件
    const Click = () => {
      emit('click')
    }
    return () => (
      <div class='devui-tag' onClick={Click}>
        <span
          class={tagClass.value}
          style={{
            display: 'block',
            color: checked.value ? '#fff' : themeColor.value,
            backgroundColor: checked.value
              ? themeColor.value
              : type.value
              ? ''
              : !color.value
              ? ''
              : '#fff'
          }}
          title={tagTitle}
        >
          {slots.default?.()}
        </span>
      </div>
    )
  }
})
