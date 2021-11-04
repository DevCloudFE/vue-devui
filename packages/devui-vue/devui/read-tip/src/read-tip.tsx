import { defineComponent, ref, onMounted, reactive, Teleport, onUnmounted } from 'vue'
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
    // 合并基础配置
    const options = { ...defaultOptions, ...props.readTipOptions }
    const defaultSlot = ref(null)
    const readTip = ref(null)
    const onMouseenter = (rule) => () => {
      setTimeout(() => {
        rule.status = true
      }, rule.mouseenterTime || options.mouseenterTime);
    }
    const onMouseleave = (rule) => () => {
      setTimeout(() => {
        rule.status = false
      }, rule.mouseleaveTime || options.mouseleaveTime);
    }

    const init = (rules, trigger = 'hover') => {
      rules.map(rule => {
        rule.status = false
        trigger = rule.trigger || trigger
        const dom = defaultSlot.value.querySelector(rule.selector);
        dom.style.position = 'relative'

        if (trigger === 'hover') {
          dom.addEventListener('mouseenter', onMouseenter(rule))
          dom.addEventListener('mouseleave', onMouseleave(rule))
        }
      })
      return rules
    }
    function show(dom, rule) {
      const top = dom.offsetTop
      // const t = document.querySelector('.read-tip-container')
      // t = t >= 0 ? -t  - 50 : t
      rule.status = true
      // tempTop.value = top - 60
    }
    // 把传入的props.rules统一转为数组对象格式
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
    const clickFn = () => {
      refRules.forEach(element => {
        element.status = false
      })
    }
    onMounted(() => {
      init(refRules, options.trigger)
      // 点击其他位置 关闭弹框
      document.addEventListener('click', clickFn, true)

    })

    onUnmounted(() => {
      // 取消事件
      document.removeEventListener('click', clickFn)
    })

    // 添加点击事件 当前元素是click事件目标则弹框展示
    const onClick = (e: Event) => {
      for (const rule of refRules) {
        const dom = defaultSlot.value.querySelector(rule.selector);
        if (dom === e.target) {
          console.log(1);
          show(dom, rule)
          return
        }
      }
    }

    return () => {
      return (<div class="devui-read-tip" >
        <div ref={defaultSlot}
          onClick={onClick}
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
