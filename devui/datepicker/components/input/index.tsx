import { defineComponent, ref } from 'vue'
import DataPickerInputIcon from '../icon/index'

import './index.css'

type TEventCallback = (e: MouseEvent) => void

export default defineComponent({
    name: 'DDatepickerInput',
    props: {
        width: { type: Number },
        onActive: { type: Function },
    },
    setup(props, ctx) {
        const { width = 160, onActive } = props || {}
        const container = ref<Element>()
        const handleClick = (e: MouseEvent) => {
            if(container.value && typeof onActive === 'function') {
                onActive(container.value)
            }
        }
        return () => {
            return (
                <div
                    ref={container}
                    class="datapicker-input-border"
                    style={{ width: `${width}px` }}
                    onClick={handleClick}
                >
                    <input class="datapicker-input" type="text" />
                    <DataPickerInputIcon marginLeft={3} />
                </div>
            )
        }
    }
})