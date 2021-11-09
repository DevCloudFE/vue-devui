import {defineComponent, inject, nextTick, onMounted, ref, watch} from 'vue'
import type { TimeAxisRootType } from '../../time-axis-types'

import {timeAxisItemProps, TimeAxisItemProps} from './types'
import './index.scss'

export default defineComponent({
    name: 'DTimeAxisItem',
    props: timeAxisItemProps,
    emits: [],
    setup(props: TimeAxisItemProps, ctx) {
        const timeAxis:TimeAxisRootType = inject('timeAxis')
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
        const renderPosition = (types: string[]) => {
            //如果有设置position的话，就直接用position的内容
            if (types.includes(props.position)) {
                return renderContent()
            } else {
                //如果是horizontal直接返回时间
                if (timeAxis.props.direction === 'horizontal') {
                    return renderTime()
                } else {
                    //如果有设定time-position,则left显示在这
                    return props.timePosition === 'left' ? renderTime():''
                }
            }
        }

        return () => {
            return (
                <div class={itemClass}>
                    <div class={`${itemClass}-data-left ${itemClass}-data-top`}>
                        {renderPosition(['top','left'])}
                    </div>
                    <div class={`${itemClass}-axis`}>
                        {
                            ctx.slots.dot
                                ? <div style={{color: props.dotColor}}> {ctx.slots.dot?.()}</div>
                                : <div class={`${itemClass}-dot ${itemClass}-type-primary`}
                                       style={{borderColor: props.dotColor}}
                                ></div>
                        }
                        {(timeAxis.props.direction === 'vertical'&&props.timePosition === 'bottom')?renderTime():''}
                        <div class={`${itemClass}-line ${itemClass}-line-style-${props.lineStyle}`}
                             style={{borderColor: props.lineColor}}
                        >
                            {ctx.slots.extra ? <div class={`${itemClass}-line-extra`}>{ctx.slots.extra()}</div>:''}
                        </div>
                    </div>
                    <div class={`${itemClass}-data-right ${itemClass}-data-bottom`}>
                        {renderPosition(['right','bottom'])}
                    </div>
                </div>

            )
        }
    }
})
