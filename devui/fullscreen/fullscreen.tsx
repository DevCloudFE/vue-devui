import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-fullscreen',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-fullscreen</div>
    }
  }
})