import { App, createApp, onUnmounted } from 'vue'
import { ToastProps } from './toast.type'
import DToast from './toast'
import { uniqueId } from 'lodash-es'

function _id() {
  return uniqueId('d-toast-service')
}

function createToastApp(props: Record<string, any>) {
  return createApp(DToast, props)
}

export function useToastService(props: Partial<ToastProps> & Pick<ToastProps, 'value'>) {
  let $body: HTMLElement | null = document.body
  let $div: HTMLDivElement | null = document.createElement('div')

  $div.dataset.id = _id()
  $body!.appendChild($div)

  let app: App<Element> | null = createToastApp({
    ...(props ?? {}),
    onHidden: () => app?.unmount()
  })
  const toastInstance = app.mount($div)

  onUnmounted(() => {
    $body!.removeChild($div!)

    $body = null
    $div = null
    app = null
  }, toastInstance.$)

  return {
    toastInstance,
    close: () => (toastInstance as any)?.removeAll?.()
  }
}

export default function installToastService(app: App) {
  if ((installToastService as any).installed) return

  app.config.globalProperties.$toastService = useToastService
  ;(installToastService as any).installed = true
}
