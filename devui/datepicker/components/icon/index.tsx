import { defineComponent } from 'vue'
import './index.css'

export default defineComponent({
    name: 'DDatepickerInputIcon',
    props: {
        marginLeft: { type: Number, default: 0 },
        marginRight: { type: Number, default: 0 },
    },
    setup(props, ctx) {
        const { marginLeft = 0, marginRight = 0 } = props || {}
        return () => <i class="datepicker-input-icon" style={{
            marginLeft: `${marginLeft}px`,
            marginRight: `${marginRight}px`,
        }}></i>
    }
})