import { getCurrentInstance } from 'vue'
import { Message } from '../toast-types'
import { useToastConstant } from './use-toast-constant'

const { ANIMATION_TIME } = useToastConstant()

export function useToastEvent() {
  const ctx = getCurrentInstance()

  function onCloseEvent(msg: Message) {
    ctx.emit('closeEvent', msg)
  }

  function onValueChange(msgs: Message[]) {
    ctx.emit('valueChange', msgs)
  }

  function onHidden() {
    setTimeout(() => (ctx.attrs.onHidden as () => void)?.(), ANIMATION_TIME)
  }

  return { onCloseEvent, onValueChange, onHidden }
}
