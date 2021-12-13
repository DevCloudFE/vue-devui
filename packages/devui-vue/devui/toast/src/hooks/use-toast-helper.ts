import { Message } from '../src/toast.type'

export function useToastHelper() {
  function severityDelay(msg: Message) {
    switch (msg.severity) {
      case 'warning':
      case 'error':
        return 10e3
      default:
        return 5e3
    }
  }

  return { severityDelay }
}
