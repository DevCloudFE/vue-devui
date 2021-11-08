import { defineComponent, ref, onMounted, Teleport } from 'vue'
import { readTipProps, ReadTipProps, } from './read-tip-types'
import './read-tip.scss'

export default defineComponent({
    name: 'DReadTipTemplate',
    props: readTipProps,
    emits: [],
    setup(props: ReadTipProps, ctx) {
        const query = props.defaultTemplateProps?.id ? `#${props.defaultTemplateProps.id}` : props.defaultTemplateProps.selector
        return () => {
            return (
                <Teleport to={query} >
                    <div class={['read-tip-container', props.defaultTemplateProps.position]}>
                        <span class='after' ></span>
                        {
                            // ctx.slots?.comp ? ctx.slots?.comp() :
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

                        {/* <slot name="contentTemplate" >

                        </slot> */}

                    </div>
                </Teleport>


            )
        }
    }
})
