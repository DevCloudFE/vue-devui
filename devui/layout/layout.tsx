import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-layout',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-layout</div>
    }
  }
})