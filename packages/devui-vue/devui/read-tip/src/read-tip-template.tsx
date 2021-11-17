import { defineComponent, ref, onMounted, Teleport } from 'vue'
import { readTipProps, ReadTipProps, } from './read-tip-types'
import './read-tip.scss'

export default defineComponent({
    name: 'DReadTipTemplate',
    props: readTipProps,
    emits: [],
    setup(props: ReadTipProps, ctx) {
        const query = props.defaultTemplateProps?.id ? `#${props.defaultTemplateProps.id}` : props.defaultTemplateProps.selector

        const temp = ref(null)
        onMounted(() => {
            // 当定位为top展示时  元素定位高度需要计算弹窗的高度
            if(props.defaultTemplateProps.position == 'top') {
                temp.value.style.top = (- temp.value.offsetHeight - 10) + 'px'
            }
        })
        return () => {
            return (
                <Teleport to={query} >
                    <div 
                    ref={temp}
                    class={['read-tip-container', props.defaultTemplateProps.position, props.defaultTemplateProps.overlayClassName]}
                    >
                        <span class='after' ></span>
                        {
                            props.defaultTemplateProps.contentTemplate ? ctx.slots?.default() :
                            (
                                <>
                                    <div class="title">
                                        {props.defaultTemplateProps.title}
                                    </div>
                                    <div class="content">
                                        {props.defaultTemplateProps.content}
                                    </div>
                                </>
                            )
                        }

                        {/* {
                            ctx.slots?.default()
                        } */}

                    </div>
                </Teleport>


            )
        }
    }
})
