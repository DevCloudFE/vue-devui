import { defineComponent, PropType, ref, watch, toRefs, ExtractPropTypes } from 'vue';

const jumpPageProps = {
  goToText: String,
  size: {
    type: String as PropType<'lg' | '' | 'sm'>,
    default: ''
  },
  pageIndex: Number,
  showJumpButton: Boolean,
  totalPages: Number,
  cursor: Number,
  onChangeCursorEmit: Function as PropType<(v: number) => void>
}

type JumpPageProps = ExtractPropTypes<typeof jumpPageProps>

export default defineComponent({
  props: jumpPageProps,
  emits: ['changeCursorEmit'],
  setup(props: JumpPageProps, { emit }) {
    const {
      pageIndex,
      totalPages,
      cursor
    } = toRefs(props)

    // 输入跳转页码
    const inputNum = ref(pageIndex.value)
    watch(
      () => pageIndex.value,
      (val: number) => {
        inputNum.value = val
      }
    )
    let curPage = pageIndex.value
    const jumpPageChange = (currentPage: number) => {
      curPage = +currentPage
      inputNum.value = currentPage
      if (isNaN(currentPage)) {
        setTimeout(() => {
          inputNum.value = pageIndex.value
        }, 300)
      }
    }
    // 跳转指定页码
    const jump = (e: KeyboardEvent | 'btn') => {
      if (curPage > totalPages.value) {
        return
      }
      if ((e === 'btn' || e.key === 'Enter') && cursor.value !== curPage) {
        emit('changeCursorEmit', curPage)
      }
    }

    return {
      inputNum,
      jumpPageChange,
      jump
    }
  },
  render() {
    const {
      goToText,
      size,
      inputNum,
      jumpPageChange,
      jump,
      showJumpButton
    } = this

    return (
      <div class="devui-jump-container">
        {goToText}

        <d-input
          class={['devui-pagination-input', size ? 'devui-pagination-input-' + size : '']}
          size={size}
          modelValue={String(inputNum)}
          onUpdate:modelValue={jumpPageChange}
          onKeydown={jump}
        />

        {
          // TODO 加入国际化后，替换为当前语言为中文的时候加上 '页'
          goToText === '跳至' && '页'
        }
        {
          showJumpButton &&
          <div
            class={['devui-jump-button', size ? 'devui-jump-size-' + size : 'devui-jump-size-default']}
            onClick={jump.bind(null, 'btn')}
            title={goToText}
          >
            <div class="devui-pagination-go"></div>
          </div>
        }
      </div>
    )
  }
})