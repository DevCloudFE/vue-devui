import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-status-demo',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-status-demo</div>
    }
  }
})