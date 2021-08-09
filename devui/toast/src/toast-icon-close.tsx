import { defineComponent, PropType } from 'vue'
import DIcon from '../../icon'

export default defineComponent({
  name: 'DToastIconClose',
  props: {
    prefixCls: String,
    onClick: Function as PropType<(e: MouseEvent) => void>
  },
  emits: ['click'],
  render() {
    const { prefixCls, $emit } = this

    const wrapperCls = `${prefixCls}-icon-close`

    return (
      <div class={wrapperCls} onClick={(e) => $emit('click', e)}>
        <DIcon name="close" size="14px" />
      </div>
    )
  }
})
