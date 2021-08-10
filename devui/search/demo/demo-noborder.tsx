import { defineComponent, ref } from 'vue'
import DSearch from '../src/search'

export default defineComponent({
  setup() {
    return () => (
      <div class="demo-d-search">
        <DSearch  iconPosition="left" noBorder></DSearch>
      </div>
    )
  },
})