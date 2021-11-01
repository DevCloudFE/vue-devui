import { defineComponent, ref, onMounted } from 'vue'
import { readTipProps, ReadTipProps, } from './read-tip-types'
import './read-tip.scss'

export default defineComponent({
    name: 'DReadTip',
    props: readTipProps,
    emits: [],
    setup(props: ReadTipProps, ctx) {


        return () => {
            return (
                <div class="read-tip-container">
                    <div class="title">
                        {props.defaultTemplateProps.title}
                    </div>
                    <div class="content">
                        {props.defaultTemplateProps.content}
                    </div>
                </div>

            )
        }
    }
})
