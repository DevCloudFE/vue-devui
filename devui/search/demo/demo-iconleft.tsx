import { defineComponent, ref } from 'vue'
import DSearch from '../search'

export default defineComponent({
  setup() {
    return () => (
      <div class="demo-d-search">
        <DSearch iconPosition="left"></DSearch>
      </div>
    )
  },
})