import './toast.scss'

import { computed, defineComponent, nextTick, onUnmounted, ref, watch } from 'vue'
import { Message, ToastProps, toastProps } from './toast-types'
import ToastIconClose from './toast-icon-close'
import ToastImage from './toast-image'
import { cloneDeep, isEqual, merge, omit, throttle } from 'lodash-es'
import { useToastEvent } from './hooks/use-toast-event'
import { useToastHelper } from './hooks/use-toast-helper'
import { useToastConstant } from './hooks/use-toast-constant'
import { toastZIndex, toastIncrease } from './hooks/use-toast-z-index'

const { ANIMATION_NAME, ANIMATION_TIME, ID_PREFIX } = useToastConstant()

export default defineComponent({
  name: 'DToast',
  inheritAttrs: false,
  props: toastProps,
  emits: ['closeEvent', 'valueChange'],
  setup(props: ToastProps, ctx) {
    const { onCloseEvent, onHidden, onValueChange } = useToastEvent()
    const { severityDelay } = useToastHelper()

    const removeThrottle = throttle(remove, ANIMATION_TIME)

    const messages = ref<Message[]>([])
    const msgAnimations = ref<Message[]>([])

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

        if (hasMsgAnimation()) {
          initValue()
        }

        nextTick(() => {
          initValue(value)
          handleValueChange()
        })
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

    function initValue(value: Message[] = []) {
      const cloneValue = cloneDeep(value)
      messages.value = cloneValue.map((v, i) => merge(v, { id: `${ID_PREFIX}-${i}` }))
      msgAnimations.value = []
    }

    function handleValueChange() {
      toastIncrease()

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
            timeoutArr[i] = setTimeout(() => singleModeRemove(msg), msg.life || severityDelay(msg))
          })
        })
      } else {
        timeout = setTimeout(() => removeAll(), defaultLife.value)
      }
    }

    function singleModeRemove(msg: Message) {
      removeMsgAnimation(msg)
      setTimeout(() => {
        onCloseEvent(msg)

        if (hasMsgAnimation()) {
          // avoid index confusion in settimeout
          const index = messages.value.indexOf(msg)
          if (index !== -1) {
            messages.value.splice(index, 1)
          }
        } else {
          messages.value = []
        }

        onValueChange(messages.value)
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
        onCloseEvent(messages.value[i])

        messages.value.splice(i, 1)

        onValueChange(messages.value)

        if (props.lifeMode === 'global') {
          removeReset()
        }
      }, ANIMATION_TIME)
    }

    function removeAll() {
      if (messages.value.length > 0) {
        msgAnimations.value = []

        setTimeout(() => {
          messages.value.forEach((msg) => onCloseEvent(msg))

          messages.value = []

          onValueChange(messages.value)
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
        timeoutArr[i!] = setTimeout(() => singleModeRemove(msg!), remainTime)
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
      const ignoreDiffKeys = ['id']
      const index = messages.value.findIndex((_msg) => isEqual(omit(_msg, ignoreDiffKeys), omit(msg, ignoreDiffKeys)))
      removeIndexThrottle(index)
    }

    function removeMsgAnimation(msg: Message) {
      msgAnimations.value = msgAnimations.value.filter((_msg) => _msg !== msg)
    }

    function close(params?: number | Message): void {
      if (params === undefined) {
        return removeAll()
      }

      if (typeof params === 'number') {
        removeIndexThrottle(params)
      } else {
        removeMsgThrottle(params)
      }
    }

    function msgItemRef(i: number) {
      return msgItemRefs.value[i] as HTMLDivElement
    }

    function hasMsgAnimation() {
      return msgAnimations.value.length > 0
    }

    return {
      messages,
      msgAnimations,
      containerRef,
      msgItemRefs,
      interrupt,
      removeReset,
      removeThrottle,
      close,
      msgItemRef
    }
  },
  render() {
    const {
      style: extraStyle,
      styleClass: extraClass,
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

    const wrapperStyles = [`z-index: ${toastZIndex}`, extraStyle]
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

    const msgContent = (msg: Message) => {
      if (typeof msg.content === 'function') {
        return msg.content(msg)
      }

      if ([null, undefined].includes(msg.content)) {
        return null
      }

      const slotPrefix = 'slot:'
      const isSlot = String(msg.content).startsWith(slotPrefix)

      if (isSlot) {
        return $slots[msg.content.slice(slotPrefix.length)]?.(msg)
      }

      return msg.content
    }

    return (
      <div ref="containerRef" style={wrapperStyles} class={wrapperCls} {...$attrs}>
        {messages.map((msg, i) => (
          <div
            ref={(el) => (msgItemRefs[i] = el)}
            key={msg.id}
            class={msgCls(msg)}
            aria-live="polite"
            onMouseenter={() => interrupt(i)}
            onMouseleave={() => removeReset(i, msg)}
          >
            <div class={`${prefixCls}-item`}>
              {showClose(msg) ? <ToastIconClose prefixCls={prefixCls} onClick={() => removeThrottle(i)} /> : null}
              {showImage(msg) ? <ToastImage prefixCls={prefixCls} severity={msg.severity} /> : null}
              <div class="devui-toast-message">
                {showSummary(msg) ? <span class="devui-toast-title">{msg.summary}</span> : null}
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
