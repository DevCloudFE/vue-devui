import { computed, defineComponent, onUnmounted, ref, Teleport, watch } from 'vue'
import { Message, ToastProps, toastProps } from './toast.type'
import DToastIconClose from './toast-icon-close'
import DToastImage from './toast-image'
import { cloneDeep, defaults, isEqual, throttle } from 'lodash-es'

import './toast.scss'

const ANIMATION_TIME = 300
const ANIMATION_NAME = 'slide-in'
const ID_PREFIX = 'toast-message'

export default defineComponent({
  name: 'DToast',
  inheritAttrs: false,
  props: toastProps,
  emits: ['closeEvent', 'valueChange'],
  setup(props: ToastProps, ctx) {
    const removeThrottle = throttle(remove, ANIMATION_TIME)

    const messages = ref<Message[]>([])
    const msgAnimations = ref<Message[]>([])
    const zIndex = ref(1060)

    const containerRef = ref<any>()
    const msgItemRefs = ref<any[]>([])

    let timestamp: number = Date.now()
    let timeout: number | undefined
    const timeoutArr: typeof timeout[] = []

    const defaultLife = computed(() => {
      if (props.life !== null) return props.life

      if (messages.value.length > 0) return severityDelay(messages.value[0])

      return 5e3
    })

    watch(
      () => props.value,
      (value) => {
        if (value.length === 0) return

        initValue()
        handleValueChange()
      },
      { deep: true, immediate: true }
    )

    watch(messages, (value) => {
      value.length === 0 && msgAnimations.value.length > 0 && (msgAnimations.value = [])
    })

    watch(msgAnimations, (value, oldValue) => {
      oldValue.length > 0 && value.length === 0 && onHidden()
    })

    onUnmounted(() => {
      if (props.sticky) {
        return
      }

      if (props.lifeMode === 'single') {
        timeoutArr.forEach((t) => t && clearTimeout(t))
      } else {
        clearTimeout(timeout)
      }
    })

    function severityDelay(msg: Message) {
      switch (msg.severity) {
        case 'warn':
        case 'error':
          return 10e3
        default:
          return 5e3
      }
    }

    function initValue() {
      const cloneValue = cloneDeep(props.value)
      messages.value = cloneValue.map((v, i) => defaults(v, { id: `${ID_PREFIX}-${i}` }))
      msgAnimations.value = []
    }

    function handleValueChange() {
      zIndex.value++

      setTimeout(() => {
        messages.value.forEach((msg) => msgAnimations.value.push(msg))
      }, 0)

      if (props.sticky) return

      if (timeout) {
        timeout = clearTimeout(timeout) as undefined
      }

      if (timeoutArr.length > 0) {
        timeoutArr.splice(0).forEach((t) => clearTimeout(t))
      }

      timestamp = Date.now()

      if (props.lifeMode === 'single') {
        setTimeout(() => {
          messages.value.forEach((msg, i) => {
            timeoutArr[i] = setTimeout(() => singleModeRemove(msg, i), msg.life || severityDelay(msg))
          })
        })
      } else {
        timeout = setTimeout(() => removeAll(), defaultLife.value)
      }
    }

    function singleModeRemove(msg: Message, i: number) {
      removeMsgAnimation(msg)
      setTimeout(() => {
        ctx.emit('closeEvent', msg)

        if (hasMsgAnimation()) {
          messages.value.splice(i, 1)
          ctx.emit('valueChange', messages.value)
        } else {
          messages.value = []
          ctx.emit('valueChange', messages.value)
        }
      }, ANIMATION_TIME)
    }

    function interrupt(i: number) {
      // 避免正在动画中的 toast 触发方法
      if (!msgAnimations.value.includes(messages.value[i])) return

      if (props.lifeMode === 'single') {
        if (timeoutArr[i]) {
          timeoutArr[i] = clearTimeout(timeoutArr[i]) as undefined
        }
      } else {
        resetDelay(() => {
          messages.value.forEach((msg, _i) => i !== _i && removeMsgAnimation(msg))
        })
      }
    }

    function resetDelay(fn: () => void) {
      if (!props.sticky && timeout) {
        timeout = clearTimeout(timeout) as undefined

        const remainTime = defaultLife.value - (Date.now() - timestamp)
        timeout = setTimeout(() => fn(), remainTime)
      }
    }

    function remove(i: number) {
      if (props.lifeMode === 'single' && timeoutArr[i]) {
        timeoutArr[i] = clearTimeout(timeoutArr[i]) as undefined
        timeoutArr.splice(i, 1)
      }

      removeMsgAnimation(messages.value[i])

      setTimeout(() => {
        ctx.emit('closeEvent', messages.value[i])

        messages.value.splice(i, 1)

        ctx.emit('valueChange', messages.value)

        if (props.lifeMode === 'global') {
          removeReset()
        }
      }, ANIMATION_TIME)
    }

    function removeAll() {
      if (messages.value.length > 0) {
        msgAnimations.value = []

        setTimeout(() => {
          messages.value.forEach((msg) => ctx.emit('closeEvent', msg))

          messages.value = []

          ctx.emit('valueChange', messages.value)
        }, ANIMATION_TIME)
      }
    }

    function removeReset(i?: number, msg?: Message) {
      // 避免点击关闭但正在动画中或自动消失正在动画中的 toast 触发重置方法
      const removed = messages.value.findIndex((_msg) => _msg === msg) === -1

      if (removed || (msg !== undefined && !msgAnimations.value.includes(msg))) {
        return
      }

      if (props.lifeMode === 'single') {
        const msgLife = msg!.life || severityDelay(msg!)
        const remainTime = msgLife - (Date.now() - timestamp)
        timeoutArr[i!] = setTimeout(() => singleModeRemove(msg!, i!), remainTime)
      } else {
        resetDelay(() => removeAll())
      }
    }

    function removeIndexThrottle(i: number) {
      if (i < msgItemRefs.value.length && i > -1) {
        removeThrottle(i)
      }
    }

    function removeMsgThrottle(msg: Message) {
      const index = messages.value.findIndex((_msg) => isEqual(_msg, msg))
      removeIndexThrottle(index)
    }

    function removeMsgAnimation(msg: Message) {
      msgAnimations.value = msgAnimations.value.filter((_msg) => _msg !== msg)
    }

    function msgItemRef(i: number) {
      return msgItemRefs.value[i] as HTMLDivElement
    }

    function hasMsgAnimation() {
      return msgAnimations.value.length > 0
    }

    function onHidden() {
      setTimeout(() => (ctx.attrs.onHidden as () => void)?.(), ANIMATION_TIME)
    }

    return {
      messages,
      msgAnimations,
      zIndex,
      containerRef,
      msgItemRefs,
      interrupt,
      remove,
      removeReset,
      removeThrottle,
      removeMsgThrottle,
      removeAll,
      msgItemRef
    }
  },
  render() {
    const {
      style: extraStyle,
      styleClass: extraClass,
      zIndex,
      messages,
      msgAnimations,
      msgItemRefs,
      life,
      interrupt,
      removeReset,
      removeThrottle,
      $attrs,
      $slots
    } = this

    const prefixCls = 'devui-toast'

    const wrapperStyles = [`z-index: ${zIndex}`, extraStyle]
    const wrapperCls = [prefixCls, extraClass]

    const msgCls = (msg: Message) => [
      `${prefixCls}-item-container`,
      `${prefixCls}-message-${msg.severity}`,
      { [ANIMATION_NAME]: msgAnimations.includes(msg) }
    ]

    const showClose = (msg: Message) => !(!msg.summary && life !== null)
    const showImage = (msg: Message) => msg.severity !== 'common'
    const showSummary = (msg: Message) => !!msg.summary
    const showContent = (msg: Message) => !!msg.content
    const showDetail = (msg: Message) => !showContent(msg) && !!msg.detail

    const msgContent = (msg: Message) => (msg.content ? $slots[msg.content]?.(msg) ?? msg.content : null)

    return (
      <div ref='containerRef' style={wrapperStyles} class={wrapperCls} {...$attrs}>
        {messages.map((msg, i) => (
          <div
            ref={(el) => (msgItemRefs[i] = el)}
            key={msg.id}
            class={msgCls(msg)}
            aria-live='polite'
            onMouseenter={() => interrupt(i)}
            onMouseleave={() => removeReset(i, msg)}
          >
            <div class={`${prefixCls}-item`}>
              {showClose(msg) ? <DToastIconClose prefixCls={prefixCls} onClick={() => removeThrottle(i)} /> : null}
              {showImage(msg) ? <DToastImage prefixCls={prefixCls} severity={msg.severity} /> : null}
              <div class='devui-toast-message'>
                {showSummary(msg) ? <span class='devui-toast-title'>{msg.summary}</span> : null}
                {showContent(msg) ? msgContent(msg) : null}
                {showDetail(msg) ? <p innerHTML={msg.detail}></p> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
})
