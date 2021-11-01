import { defineComponent, ref, onMounted, reactive } from 'vue'
import { readTipProps, ReadTipProps } from './read-tip-types'
import './read-tip.scss'
import TipsTemplate from './read-tip-template';

export default defineComponent({
  name: 'DReadTip',
  props: readTipProps,
  emits: [],
  setup(props: ReadTipProps, ctx) {

    const readTip = ref(null)

    const init = (rules, trigger = 'hover') => {
      rules.map(rule => {
        rule.status = false
        trigger = rule.trigger || trigger
        const dom = document.querySelector(rule.selector);
        dom.style.position = 'relative'
        if (trigger === 'hover') {
          dom.addEventListener('mouseenter', () => {
            rule.status = true
          })
          dom.addEventListener('mouseleave', () => {
            rule.status = false
          })
        }

        if (trigger === 'click') {
          dom.addEventListener('click', () => {
            rules.forEach(element => {
              element.status = false
            });
            rule.status = true
          })
          // dom.addEventListener('mouseleave', () => {
          //   rule.status = false
          // }) 
        }
      })
      return rules
    }

    const rules = (rules) => {
      if (rules === null) return
      if (typeof rules === 'object' && !Array.isArray(rules)) {
        rules = [rules]
      }
      rules = [...rules]
      Array.isArray(rules) && rules.map(rule => {
        rule.status = false
      })
      return rules
    }
    const refRules = reactive(rules(props.readTipOptions.rules))

    onMounted(() => {
      init(refRules, props.readTipOptions.trigger || 'click')
    })
    return () => {
      return (<div class="devui-read-tip" ref="readTip">
        {
          ctx.slots?.default()
        }
        {(refRules).map(rule => (rule.status &&
          // <teleport to={rule.selector} >
            <TipsTemplate defaultTemplateProps={rule} />
          // </teleport>
        )
        )}
      </div>)
    }
  }
})
