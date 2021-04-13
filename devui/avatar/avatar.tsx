import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-avatar',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-avatar</div>
    }
  }
})