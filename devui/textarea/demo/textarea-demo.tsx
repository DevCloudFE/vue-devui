import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-textarea-demo',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-textarea-demo</div>
    }
  }
})