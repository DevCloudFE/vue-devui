import {defineComponent, nextTick, onMounted, ref, watch} from 'vue'

import {timeAxisItemProps, TimeAxisItemProps} from './types'
import './index.scss'

export default defineComponent({
    name: 'DTimeAxisItem',
    props: timeAxisItemProps,
    emits: [],
    setup(props: TimeAxisItemProps, ctx) {
        const itemClass = 'devui-time-axis-item'
        const renderTime = () => {
            return (
                <div>
                    {
                        ctx.slots.time
                            ? ctx.slots.time?.()
                            : props.time
                    }
                </div>
            )
        }
        const renderContent = () => {
            return (
                <div>
                    {ctx.slots.default?.(props)}
                </div>
            )
        }

        return () => {
            return (
                <div class={itemClass}>
                    <div class={`${itemClass}-data-left ${itemClass}-data-top`}>
                        {(props.position==='top'|| props.position==='left')?renderContent():renderTime()}
                    </div>
                    <div class={`${itemClass}-axis`}>
                        {
                            ctx.slots.dot
                                ? <div style={{color: props.dotColor}}> {ctx.slots.dot?.()}</div>
                                : <div class={`${itemClass}-dot ${itemClass}-type-primary`}
                                       style={{borderColor: props.dotColor}}
                                ></div>
                        }

                        <div class={`${itemClass}-line ${itemClass}-line-style-${props.lineStyle}`}
                             style={{borderColor: props.lineColor}}
                        >
                            {ctx.slots.extra?<div class={`${itemClass}-line-extra`}>{ctx.slots.extra()}</div>:''}
                        </div>
                    </div>
                    <div class={`${itemClass}-data-right ${itemClass}-data-bottom`}>
                        {(props.position==='bottom'|| props.position==='right')?renderContent():renderTime()}
                    </div>
                </div>

            )
        }
    }
})
