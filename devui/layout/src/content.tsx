import './content.scss'

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DContent',
    setup (props, { slots }) {
        return () => <div class="d-content">{slots.default?.()}</div>
    }
})