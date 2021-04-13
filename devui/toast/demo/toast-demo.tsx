import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-toast-demo',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-toast-demo</div>
    }
  }
})