import { defineComponent } from 'vue'
import './customStyle.scss'

export default defineComponent({
  render() {
    return (
      <div class="devui-circle-loading-container-2">
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
          <defs>
            <linearGradient x1="-4.49677665%" y1="50%" x2="105.739916%" y2="50%" id="devui-loading-circle-linearGradient">
              <stop stop-color="#2276FD" offset="0%"></stop>
              <stop stop-color="#6BD5FF" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
            <circle
              transform="rotate(90,8,8)"
              stroke="url(#devui-loading-circle-linearGradient)"
              stroke-width="2"
              cx="8"
              cy="8"
              r="6"
            ></circle>
          </g>
        </svg>
      </div>
    )
  }
})