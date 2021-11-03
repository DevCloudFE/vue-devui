import { defineComponent, ref, onMounted, reactive, Teleport,  } from 'vue'
import { readTipProps, ReadTipProps, ReadTipOptions } from './read-tip-types'
import './read-tip.scss'
import TipsTemplate from './read-tip-template';

export default defineComponent({
  name: 'DReadTip',
  props: readTipProps,
  emits: [],
  setup(props: ReadTipProps, ctx) {
    // 默认配置
    const defaultOptions: ReadTipOptions = {
      trigger: 'hover',
      showAnimate: false,
      mouseenterTime: 100,
      mouseleaveTime: 100,
      position: 'top',
      overlayClassName: '',
      appendToBody: true,
      rules: { selector: null },
    };
    const tempTop = ref(0)
    const options = { ...defaultOptions, ...props.readTipOptions }
    const defaultSlot = ref(null)
    const readTip = ref(null)
    
    const init = (rules, trigger = 'hover') => {
      rules.map(rule => {
        rule.status = false
        trigger = rule.trigger || trigger
        const dom = defaultSlot.value.querySelector(rule.selector);
        dom.style.position = 'relative'
        if (trigger === 'hover') {
          dom.addEventListener('mouseenter', () => {
            show(dom, rule, )
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
            show(dom, rule)
          })
          // document.addEventListener('click', (e: any) => {
          //   rules.forEach(element => {
          //     element.status = false
          //     if (element.selector.indexOf(e.target.className) != -1) {
          //       show(dom, element)
          //     }
          //   });

          // }, false)
          // dom.addEventListener('mouseleave', () => {
          //   rule.status = false
          // }) 
        }
      })
      return rules
    }
    function show(dom, rule) {
      const top = dom.offsetTop
      // console.log("🚀 ~ file: read-tip.tsx ~ line 66 ~ show ~ top", top)
      const t = document.querySelector('.read-tip-container')
      // t = t >= 0 ? -t  - 50 : t
      rule.status = true
      tempTop.value = top - 60
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
    const refRules = reactive(rules(options.rules))

    onMounted(() => {
      init(refRules, options.trigger)
      // console.log("🚀 ~ file: read-tip.tsx ~ line 25 ~ setup ~ defaultSlot", defaultSlot.value)

    })
    return () => {
      return (<div class="devui-read-tip" >
        <div ref={defaultSlot} 
          onMouseenter={ e => {
            console.log(e,'.readtip-target')
          // var a =  e.target.querySelector('.readtip-target')
          // console.log("🚀 ~ file: read-tip.tsx ~ line 98 ~ return ~ a", a)
          }}
        >
          {
            ctx.slots?.default()
          }
        </div>

        {(refRules).map(rule => (
          <div

          >
            {rule.status && <TipsTemplate defaultTemplateProps={{ ...rule, top: tempTop }} />}
          </div>
        )
        )}
      </div>)
    }
  }
})
