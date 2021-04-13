import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-panel',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-panel</div>
    }
  }
})