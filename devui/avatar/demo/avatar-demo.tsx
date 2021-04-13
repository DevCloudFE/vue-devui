import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-avatar-demo',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-avatar-demo</div>
    }
  }
})