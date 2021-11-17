import { defineComponent, reactive, ref, Ref, onMounted, Teleport, toRefs } from 'vue'
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
        const domBounding = document.querySelector(query).getBoundingClientRect();  
        const styles: any = reactive(rule.appendToBody ? {
            top: domBounding.y + document.documentElement.scrollTop + 'px',
            left: domBounding.x + 'px',
            transform: ''
        } : {})
        if (typeof rule.dataFn === 'function') {
            const dataFn = rule.dataFn({ element: document.querySelector(query), rule })
            rule = { ...rule, ...dataFn }
        }

        const temp = ref(null)
        onMounted(() => {
            // 当定位为top展示时  元素定位高度需要计算弹窗的高度
            if (rule.position == 'top' && !rule.appendToBody) {
                temp.value.style.top = (- temp.value.offsetHeight - 10) + 'px'
            } else if (rule.appendToBody) {
                switch(rule.position) {
                    case 'top': 
                        styles.transform = 'translate(0px, calc(-100% - 10px))'
                        break;
                    case 'left': 
                        styles.transform = 'translate(calc(-100% - 10px), 0)'
                        break;
                    case 'bottom': 
                        styles.top = domBounding.y + domBounding.height + document.documentElement.scrollTop + 10 + 'px'
                        break;
                    case 'right': 
                    console.log(temp.value)
                        styles.left = domBounding.x + domBounding.width + 'px'
                        break;
                }
                // const domBounding = rule.dom.getBoundingClientRect();                
                // styles.top = domBounding.y + document.documentElement.scrollTop - temp.value.offsetHeight - 10 + 'px'
                // styles.left = domBounding.x + 'px';
            }
        })
        return () => {
            return (
                <Teleport to={rule.appendToBody ? 'body' : query} >
                    <div
                        ref={temp}
                        class={['read-tip-container', rule.position, rule.overlayClassName]}
                        style={styles}
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
