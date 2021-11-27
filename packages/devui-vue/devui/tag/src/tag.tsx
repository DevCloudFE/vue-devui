import { defineComponent, toRefs, ref } from 'vue'
import { tagProps, TagProps } from './tag-types'
import { useClass, useColor } from './hooks'
import IconClose from './assets/close.svg'
import IconDefaultClose from './assets/defaultClose.svg'
import './tag.scss'
// 类型声明

export default defineComponent({
  name: 'DTag',
  props: tagProps,
  emits: ['click', 'tagDelete'],
  setup(props: TagProps, { slots, emit }) {
    const { type, color, checked, titleContent, deletable } = toRefs(props)
    const tagClass = useClass(props)
    const themeColor = useColor(props)
    const tagTitle = titleContent.value || ''
    const isDefaultTag = () => !type.value && !color.value
    const isShow = ref(true)
    // 子组件的点击事件
    const Click = () => {
      emit('click')
    }
    const handleDelete = () => {
      isShow.value = false
      emit('tagDelete')
    }
    const closeIconEl = () => {
      return deletable.value ? (
        <a
          class='remove-button'
          style={{
            color: checked.value ? '#fff' : themeColor.value
          }}
          onClick={handleDelete}
        >
          {isDefaultTag() ? <IconDefaultClose /> : <IconClose />}
        </a>
      ) : null
    }

    return () =>
      isShow.value && (
        <div class='devui-tag' onClick={Click} v-show={isShow.value}>
          <span
            class={tagClass.value}
            style={{
              display: 'block',
              color: checked.value ? '#fff' : themeColor.value,
              backgroundColor: checked.value ? themeColor.value : !color.value ? '' : '#fff'
            }}
            title={tagTitle}
          >
            {slots.default?.()}
            {closeIconEl()}
          </span>
        </div>
      )
  }
})
