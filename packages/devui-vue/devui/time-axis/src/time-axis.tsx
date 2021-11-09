import {defineComponent, Fragment, nextTick, onMounted, provide, reactive, ref, toRef, watch} from 'vue'
import {timeAxisProps, TimeAxisProps,TimeAxisRootType} from './time-axis-types'
import TimeAxisItem from './components/time-axis-item'
import './time-axis.scss'

export default defineComponent({
    name: 'DTimeAxis',
    components: {TimeAxisItem},
    props: timeAxisProps,
    emits: [],
    setup(props: TimeAxisProps, ctx) {
        provide<TimeAxisRootType>('timeAxis', {ctx, props})
        const timeAxis = ref<null | HTMLElement>();
        const marginLeft = ref(0);
        const style = reactive({
            marginLeft: '0px',
            height: 'auto'
        })
        const setStyle = () => {
            style.height = 'auto'
            style.marginLeft = '0px'
            if (props.direction === 'horizontal') {
                nextTick(() => {
                    const el = timeAxis.value;
                    if (props.center) {
                        //计算偏移量
                        style.marginLeft = (el?.firstElementChild?.clientWidth || 0) / 2 + 'px'
                    }
                    //算出最大高度
                    style.height = Math.max(
                            ...Array.from(el?.querySelectorAll('.devui-time-axis-item-data-top')).map(el => el.clientHeight),
                            ...Array.from(el?.querySelectorAll('.devui-time-axis-item-data-bottom')).map(el => el.clientHeight)
                        ) * 2
                        + Math.max(...Array.from(el?.querySelectorAll('.devui-time-axis-item-axis')).map(el => el.clientHeight))
                        + 'px'
                });
            }
        }
        onMounted(() => {
            setStyle()
        });
        watch(toRef(props, 'direction'), () => {
            setStyle()
        })
        return () => {
            const renderPositionNode = (item, position?) => {
                let timePosition:string = props.timePosition ? props.timePosition : 'left'
                if(item.props?.timePosition||item.props?.['time-position']){
                    timePosition = item.props.timePosition
                }
                return position
                    ? <item position={position} time-position={timePosition}/>
                    : <item time-position={timePosition}/>
            }


            const renderItem = () => {
                const slots: any[] = ctx.slots.default?.() ?? [];
                let children;
                if (slots.length === 1 && slots[0].type === Fragment) {
                    children = slots[0].children || []
                } else {
                    children = slots
                }
                return children.map((item, index) => {
                    if (props.direction === 'horizontal') {
                        //判断是否有自定义的位置信息，且是否正确 有，且正确直接用
                        if (item.props?.position === 'top' || item.props?.position === 'bottom') return renderPositionNode(item)
                        //判断是否需要交替
                        if (props.mode === 'alternative') {
                            return renderPositionNode(item, index % 2 == 0 ? 'bottom' : 'top')
                        } else {
                            //不需要交替的直接给默认值
                            return renderPositionNode(item, 'bottom')
                        }
                    } else {
                        if (item.props?.position === 'left' || item.props?.position === 'right') return renderPositionNode(item)
                        if (props.mode === 'alternative') {
                            return renderPositionNode(item, index % 2 == 0 ? 'left' : 'right')
                        } else {
                            return renderPositionNode(item, 'right')
                        }
                    }
                })
            }
            //防止字段传入错误，导致显示错误
            const getDirection = () => {
                return props.direction === 'horizontal' ? 'horizontal' : 'vertical'
            }

            return (
                <div
                    class={`devui-time-axis-${getDirection()}  ${props.center ? 'devui-time-axis-' + getDirection() + '-center' : ''} `}
                    ref={timeAxis}
                    style={style}
                >
                    {renderItem()}
                </div>
            )
        }
    }
})
