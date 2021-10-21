import {defineComponent} from 'vue'

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
                        <span>
                        {props.time}
                        </span>
                    </div>
                    <div class={`${itemClass}-axis`}>
                        <div class={`${itemClass}-line ${itemClass}-line-style-solid`}></div>
                        <div class={`${itemClass}-dot ${itemClass}-type-primary`} style={{borderColor: props.dotColor}}></div>
                        <div class={`${itemClass}-line ${itemClass}-line-style-solid`}></div>
                    </div>
                    <div class={`${itemClass}-data-right ${itemClass}-data-bottom`}>
                        {props.text}
                    </div>
                </div>
            )
        }
    }
})
