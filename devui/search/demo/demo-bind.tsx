import { defineComponent, ref } from 'vue'
import DSearch from '../search'

export default defineComponent({
  setup() {
    const searchText = ref('Devui')
    return () => (
      <div class="demo-d-search">
        <DSearch v-model={searchText.value}></DSearch>
      </div>
    )
  },
})