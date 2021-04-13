import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-card-demo',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-card-demo</div>
    }
  }
})