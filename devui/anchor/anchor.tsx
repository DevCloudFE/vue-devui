import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-anchor',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-anchor</div>
    }
  }
})