import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-accordion-item',
  props: {

  },
  setup(props, ctx) {
    return () => {
      return <li>d-accordion-item</li>
    }
  }
})