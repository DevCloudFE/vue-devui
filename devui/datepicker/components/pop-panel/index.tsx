import { defineComponent } from 'vue'

import './index.css'

export default defineComponent({
    name: 'DDatepickerPopPanel',
    props: {
      show: { type: Boolean, default: true },
    },
    setup(props) {
      return() => {
        if(!props.show) {
          return null
        }
        return (<div class="datapicker-pop-panel">POP PANEL</div>)
      }
    }
  })