import './footer.scss'

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DFooter',
    setup (props, { slots }) {
        return () => <div class="d-footer">{ slots.default?.() }</div>
    }
})