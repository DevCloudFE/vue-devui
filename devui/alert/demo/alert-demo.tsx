import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-alert-demo',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-alert-demo</div>
    }
  }
})