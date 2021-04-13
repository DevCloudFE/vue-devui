import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-status',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-status</div>
    }
  }
})