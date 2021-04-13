import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-tooltip',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-tooltip</div>
    }
  }
})