import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-toast',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-toast</div>
    }
  }
})