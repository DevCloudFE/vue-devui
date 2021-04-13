import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-toggle',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-toggle</div>
    }
  }
})