import { defineComponent, reactive, ref, onMounted, Teleport, toRefs } from 'vue'
import { readTipProps, ReadTipProps, DefaultTemplateProps } from './read-tip-types'
import './read-tip.scss'

export default defineComponent({
  name: 'DReadTipTemplate',
  props: readTipProps,
  emits: [],
  setup(props: ReadTipProps, ctx) {
    const { defaultTemplateProps, } = toRefs(props)
    let rule: DefaultTemplateProps = defaultTemplateProps.value
    const query = rule?.id ? `#${rule.id}` : rule.selector;

    const styles: any = reactive({});
    if (typeof rule.dataFn === 'function') {
      const dataFn = rule.dataFn({ element: document.querySelector(query), rule })
      rule = { ...rule, ...dataFn }
    }

    const temp = ref(null);
    onMounted(() => {
      const domBounding = document.querySelector(query).getBoundingClientRect();
      
      const distance = 10; 
      let positionTop = 0;
      let positionLeft = 0;
      const targetDom = document.querySelector('.read-tip-container').getBoundingClientRect();
      if (rule.appendToBody) {
        positionTop = domBounding.y + document.documentElement.scrollTop;
        positionLeft = domBounding.x;
      }
      switch (rule.position) {
        case 'top':
          styles.top = positionTop - targetDom.height - distance + 'px';
          styles.left = positionLeft + 'px';
          break;
        case 'left':
          styles.top = positionTop + 'px';
          styles.left = positionLeft - targetDom.width - distance + 'px';
          break;
        case 'bottom':
          styles.top = positionTop + domBounding.height + distance + 'px'
          styles.left = positionLeft + 'px';
          break;
        case 'right':
          styles.top = positionTop + 'px';
          styles.left = positionLeft + domBounding.width + distance + 'px';
          break;
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
