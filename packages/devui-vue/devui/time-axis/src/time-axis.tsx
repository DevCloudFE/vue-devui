import {defineComponent, Fragment, nextTick, onMounted, reactive, ref, toRef, watch} from 'vue'
import {timeAxisProps, TimeAxisProps} from './time-axis-types'
import TimeAxisItem from './components/time-axis-item'
import './time-axis.scss'

export default defineComponent({
    name: 'DTimeAxis',
    components: {TimeAxisItem},
    props: timeAxisProps,
    emits: [],
    setup(props: TimeAxisProps, ctx) {
        console.log(TimeAxisItem)
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
            const renderItem = () => {
                const slots: any[] = ctx.slots.default?.() ?? [];
                console.log(slots)
                let children;
                if (slots.length === 1 && slots[0].type === Fragment) {
                    children = slots[0].children || []
                } else {
                    children = slots
                }
                console.log(children)
                return children.map((item, index) => {
                    if (props.direction === 'horizontal') {
                        console.log(item)
                        //判断是否有自定义的位置信息，且是否正确 有，且正确直接用
                        if (item.props?.position === 'top' || item.props?.position === 'bottom') return <item/>
                        //判断是否需要交替
                        if (props.mode === 'alternative') {
                            return index % 2 == 0 ? <item position="bottom"/> : <item position="top"/>
                        } else {
                            //不需要交替的直接给默认值
                            return <item position="bottom"/>
                        }

                    } else {
                        if (item.props?.position === 'left' || item.props?.position === 'right') return <item/>
                        if (props.mode === 'alternative') {
                            return index % 2 == 0 ? <item position="left"/> : <item position="right"/>
                        } else {
                            return <item position="right"/>
                        }
                    }
                })
            }


            return (
                <div
                    class={`devui-time-axis-${props.direction === 'horizontal' ? 'horizontal' : 'vertical'}  ${props.center ? 'devui-time-axis-' + (props.direction === 'horizontal' ? 'horizontal' : 'vertical') + '-center' : ''} `}
                    ref={timeAxis}
                    style={style}
                >
                    {renderItem()}
                </div>
            )
        }
    }
})
