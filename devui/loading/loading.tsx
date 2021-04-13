import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-loading',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-loading</div>
    }
  }
})