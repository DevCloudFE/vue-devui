import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DAside',
    setup (props, { slots }) {
        return () => <div class="d-aside">{ slots.default?.() }</div>
    }
})