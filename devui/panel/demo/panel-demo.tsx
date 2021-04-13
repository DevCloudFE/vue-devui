import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-panel-demo',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-panel-demo</div>
    }
  }
})