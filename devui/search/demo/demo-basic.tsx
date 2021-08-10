import { defineComponent, ref } from 'vue'
import DSearch from '../src/search'

export default defineComponent({
  setup() {
    return () => (
      <div class="demo-container">
        <div class="demo-example">
          <h5 class="demo-text">{ 'Small' }</h5>
          <div class="demo-d-search">
            <DSearch size="sm"></DSearch>
          </div>
        </div>
        <div class="demo-example">
          <h5 class="demo-text">{ 'Middle' }</h5>
          <div class="demo-d-search">
            <DSearch></DSearch>
          </div>
        </div>
        <div class="demo-example">
          <h5 class="demo-text">{ 'Large' }</h5>
          <div class="demo-d-search">
            <DSearch size="lg"></DSearch>
          </div>
        </div>
        <div class="demo-example">
          <h5 class="demo-text">{ 'Disabled' }</h5>
          <div class="demo-d-search">
            <DSearch disabled></DSearch>
          </div>
        </div>
      </div>
    )
  },
})