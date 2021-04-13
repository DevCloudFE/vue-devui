import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-read-tip',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-read-tip</div>
    }
  }
})