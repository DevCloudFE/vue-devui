import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-back-top',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-back-top</div>
    }
  }
})