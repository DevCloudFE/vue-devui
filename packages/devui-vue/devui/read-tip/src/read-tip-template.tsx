import { defineComponent, ref, Ref, onMounted, Teleport, toRefs } from 'vue'
import { readTipProps, ReadTipProps, DefaultTemplateProps } from './read-tip-types'
import './read-tip.scss'

export default defineComponent({
    name: 'DReadTipTemplate',
    props: readTipProps,
    emits: [],
    setup(props: ReadTipProps, ctx) {
        const { defaultTemplateProps } = toRefs(props)
        let rule: DefaultTemplateProps = defaultTemplateProps.value
        const query = rule?.id ? `#${rule.id}` : rule.selector

        if (typeof rule.dataFn === 'function') {
            const dataFn = rule.dataFn({ element: rule.dom, rule })
            rule = { ...rule, ...dataFn }
        }

        const temp = ref(null)
        onMounted(() => {
            // 当定位为top展示时  元素定位高度需要计算弹窗的高度
            if (rule.position == 'top') {
                temp.value.style.top = (- temp.value.offsetHeight - 10) + 'px'
            }
        })
        return () => {
            return (
                <Teleport to={query} >
                    <div
                        ref={temp}
                        class={['read-tip-container', rule.position, rule.overlayClassName]}
                    >
                        <span class='after' ></span>
                        {
                            rule.contentTemplate ? ctx.slots?.default() :
                                (
                                    <>
                                        <div class="title">
                                            {rule.title}
                                        </div>
                                        <div class="content">
                                            {rule.content}
                                        </div>
                                    </>
                                )
                        }

                    </div>
                </Teleport>


            )
        }
    }
})
