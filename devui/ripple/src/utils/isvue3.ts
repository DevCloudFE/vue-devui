import { App } from 'vue'

interface Vue2 {
  default: {
    version: string
  }
}

const isVue3 = (app: Vue2 | App): app is App => 'config' in app && 'globalProperties' in app.config
export { isVue3 }
