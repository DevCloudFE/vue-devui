import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-progress',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-progress</div>
    }
  }
})