import './header.scss'

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DHeader',
    setup (props, { slots }) {
        return () => <div class="d-header">{ slots.default?.() }</div>
    }
})