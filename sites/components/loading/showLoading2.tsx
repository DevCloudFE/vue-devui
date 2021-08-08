import { defineComponent } from 'vue'
import './customStyle.scss'

export default defineComponent({
  render() {
    return (
      <div class="devui-circle-loading-container">
        <svg
          class="devui-circle-loading"
          width="16px"
          height="16px"
          viewBox="0 0 16 16"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          // @ts-ignore
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.600000024" stroke-linecap="round">
            <circle transform="rotate(90,8,8)" stroke="#FFFFFF" stroke-width="2" cx="8" cy="8" r="6"></circle>
          </g>
        </svg>
      </div>
    )
  }
})