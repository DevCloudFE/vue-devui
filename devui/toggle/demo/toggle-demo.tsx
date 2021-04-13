import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-toggle-demo',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-toggle-demo</div>
    }
  }
})