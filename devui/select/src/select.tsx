
import './select.scss'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DSelect',
  setup() {
    return () => {
      return (
        <div class="devui-select">
          <div class="devui-select-selection">
            <input
              {...{dtextinput: true}}
              type="text"
              class="devui-select-input"
            />
          </div>
          <div class="devui-select-dropdown">
            <ul class="devui-select-dropdown-list">
              <li class="devui-select-item">试试</li>
              <li class="devui-select-item">试试</li>
            </ul>
          </div>
        </div>
      )
    }
  }
})