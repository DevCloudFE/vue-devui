import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-card',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-card</div>
    }
  }
})