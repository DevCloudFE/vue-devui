import { defineComponent, ref, onMounted, Teleport } from 'vue'
import { readTipProps, ReadTipProps, } from './read-tip-types'
import './read-tip.scss'

export default defineComponent({
    name: 'DReadTipTemplate',
    props: readTipProps,
    emits: [],
    setup(props: ReadTipProps, ctx) {
        return () => {
            return (
                <Teleport to={`${props.defaultTemplateProps.selector}`} >
                    <div   class={['read-tip-container',props.defaultTemplateProps.position]}>
                    <span class='after' ></span>
                    <div class="title">
                        {props.defaultTemplateProps.title}
                    </div>
                    <div class="content">
                        {props.defaultTemplateProps.content}
                    </div>
                </div>
                </Teleport>
                

            )
        }
    }
})
