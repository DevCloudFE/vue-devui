import {defineComponent, nextTick, onMounted, ref, watch} from 'vue'

import {timeAxisItemProps, TimeAxisItemProps} from './types'
import './index.scss'

export default defineComponent({
    name: 'DTimeAxisItem',
    props: timeAxisItemProps,
    emits: [],
    setup(props: TimeAxisItemProps, ctx) {
        const itemClass = 'devui-time-axis-item'
        return () => {
            return (
                <div class={itemClass}>
                    <div class={`${itemClass}-data-left ${itemClass}-data-top`}>
                        <div>
                            {props.time}
                        </div>
                    </div>
                    <div class={`${itemClass}-axis`}>
                        <div class={`${itemClass}-dot ${itemClass}-type-primary`} style={{borderColor: props.dotColor}}
                        ></div>
                        <div class={`${itemClass}-line ${itemClass}-line-style-solid`}></div>
                    </div>
                    <div class={`${itemClass}-data-right ${itemClass}-data-bottom`}>
                        <div>
                            {props.text}
                        </div>
                    </div>
                </div>
            )
        }
    }
})
