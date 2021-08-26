import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    goToText: String,
    size: {
      type: String as PropType<'lg' | '' | 'sm'>,
      default: ''
    },
    inputPageNum: Number,
    jump: Function,
    jumpPageChange: Function,
    showJumpButton: Boolean
  } as const,
  render() {
    const {
      goToText,
      size,
      inputPageNum,
      jumpPageChange,
      jump,
      showJumpButton
    } = this

    return (
      <div class="devui-jump-container">
        {goToText}

        <d-input
          class={['devui-input', size ? 'devui-input-' + size : '']}
          value={String(inputPageNum)}
          onUpdate:value={jumpPageChange}
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
            title="跳至"
          >
            <div class="devui-pagination-go"></div>
          </div>
        }
      </div>
    )
  }
})