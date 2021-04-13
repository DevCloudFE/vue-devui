import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-layout-demo',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-layout-demo</div>
    }
  }
})