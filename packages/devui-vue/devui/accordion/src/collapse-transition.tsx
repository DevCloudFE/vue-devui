import { defineComponent, toRefs, Transition } from 'vue'

export default defineComponent({
  name: 'DAccordionMenu',
  props: {
    showTransition: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots }) {
    /* istanbul ignore next */
    const { showTransition } = toRefs(props)
    const trimArr = function (s: string) {
      return (s || '').split(' ').filter((item) => !!item.trim())
    }

    /* istanbul ignore next */
    const addClass = (el: HTMLElement | Element, cls: string): void => {
      if (!el) return
      let className = el.getAttribute('class') || ''
      const curClass = trimArr(className)
      const classes = (cls || '')
        .split(' ')
        .filter((item) => !curClass.includes(item) && !!item.trim())

      if (el.classList) {
        el.classList.add(...classes)
      } else {
        className += ` ${classes.join(' ')}`
        el.setAttribute('class', className)
      }
    }

    /* istanbul ignore next */
    const removeClass = (el: HTMLElement | Element, cls: string): void => {
      if (!el || !cls) return
      const classes = trimArr(cls)
      let curClass = el.getAttribute('class') || ''

      if (el.classList) {
        el.classList.remove(...classes)
        return
      }
      classes.forEach((item) => {
        curClass = curClass.replace(` ${item} `, ' ')
      })
      const className = trimArr(curClass).join(' ')
      el.setAttribute('class', className)
    }

    const beforeEnter = (el) => {
      addClass(el, 'collapse-transition')
      el.style.height = '0'
    }
    const enter = (el) => {
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px'
      } else {
        el.style.height = ''
      }

      el.style.overflow = 'hidden'
    }
    const afterEnter = (el) => {
      removeClass(el, 'collapse-transition')
      el.style.height = ''
    }
    const beforeLeave = (el) => {
      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden'
    }
    const leave = (el) => {
      if (el.scrollHeight !== 0) {
        addClass(el, 'collapse-transition')
        el.style.height = 0
      }
    }
    const afterLeave = (el) => {
      removeClass(el, 'collapse-transition')
      el.style.height = ''
    }

    return () => {
      return showTransition.value ? (
        <Transition
          name='devui-accordion'
          onBeforeEnter={beforeEnter}
          onAfterEnter={afterEnter}
          onBeforeLeave={beforeLeave}
          onAfterLeave={afterLeave}
          onEnter={enter}
          onLeave={leave}
        >
          {slots.default?.()}
        </Transition>
      ) : (
        <>{slots.default?.()}</>
      )
    }
  }
})
