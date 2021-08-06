import { defineComponent } from 'vue'
import DataPickerInputIcon from '../icon/index'

import './index.css'

export default defineComponent({
    name: 'DDatepickerInput',
    props: {
        width: { type: Number, default: 160 },
        onActive: { type: Function, default: null },
    },
    setup(props, ctx) {
        const { width = 160, onActive } = props || {}
        return () => {
            return (
                <div
                    class="datapicker-input-border"
                    style={{ width: `${width}px` }}
                    onClick={onActive}
                >
                    <input class="datapicker-input" type="text" />
                    <DataPickerInputIcon marginLeft={3} />
                </div>
            )
        }
    }
})