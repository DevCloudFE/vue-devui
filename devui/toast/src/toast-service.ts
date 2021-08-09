import { App, ComponentPublicInstance, createApp, onUnmounted } from 'vue'
import { ToastProps } from './toast.type'
import DToast from './toast'

function createToastApp(props: Record<string, any>) {
  return createApp(DToast, props)
}

class ToastService {
  static open(props: Partial<ToastProps> & Pick<ToastProps, 'value'>) {
    let $body: HTMLElement | null = document.body
    let $div: HTMLDivElement | null = document.createElement('div')

    $body.appendChild($div)

    let app = createToastApp({ ...(props ?? {}), onHidden: () => app?.unmount() })
    let toastInstance = app.mount($div)

    onUnmounted(() => {
      $body.removeChild($div)

      $body = null
      $div = null

      app = null
      toastInstance = null
    }, toastInstance.$)

    return {
      toastInstance
    }
  }
}

export default ToastService
