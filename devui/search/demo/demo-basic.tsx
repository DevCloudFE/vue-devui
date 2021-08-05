import { defineComponent } from 'vue'
import DSearch from '../search'
export default defineComponent({
  render() {
    return (
      <div class="demo-container">
        <div class="demo-example">
          <h5 class="demo-text">{ 'Small' }</h5>
          <DSearch></DSearch>
        </div>
        <div class="demo-example">
          <h5 class="demo-text">{ 'Middle' }</h5>
          <DSearch></DSearch>
        </div>
        <div class="demo-example">
          <h5 class="demo-text">{ 'Large' }</h5>
          <DSearch></DSearch>
        </div>
        <div class="demo-example">
          <h5 class="demo-text">{ 'Disabled' }</h5>
          <DSearch></DSearch>
        </div>
      </div>
    )
  }
})