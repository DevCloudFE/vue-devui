import './popover.scss'
import { defineComponent } from 'vue'
import PropsPopover from './types';
export default defineComponent({
  name: 'DPopover',
  props: {
    ...PropsPopover
  },
  setup(props, ctx) {
    return {}
  },

  render() {
    const { content, $slots } = this;
    return (
      <div class="d-popover">
        <main class="devui-popover-content">
          {$slots.content?.() || content}
        </main>

      </div>
    )
  }
})
