import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-badge-demo',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-badge-demo</div>
    }
  }
})