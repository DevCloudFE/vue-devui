import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-badge',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-badge</div>
    }
  }
})