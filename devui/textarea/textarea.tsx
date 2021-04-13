import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-textarea',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <div>devui-textarea</div>
    }
  }
})