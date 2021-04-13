import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-loading-demo',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-loading-demo</div>
    }
  }
})