import { defineComponent } from 'vue'

import Demo1 from './demo1'

export default defineComponent({
  name: 'd-carousel-demo',
  setup(props, ctx) {
    return () => {
      return <div class="d-carousel-item" >
        <Demo1 />
      </div>
    }
  }
})