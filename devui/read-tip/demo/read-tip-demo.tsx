import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-read-tip-demo',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-read-tip-demo</div>
    }
  }
})