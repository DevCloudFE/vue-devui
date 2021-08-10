/* eslint-disable */
import { defineComponent } from 'vue'
import { createComponent } from './component'
import Loading from './loading'

import { LoadingProps } from './types'

const loadingConstructor = defineComponent(Loading)

interface TargetElement extends Element {
  style ?: any
}

const cacheTarget = new WeakMap()

const loading = {
  open(options: LoadingProps = {}) {

    const parent: TargetElement = options.target || document.body

    if (cacheTarget.has(parent)) {
      return cacheTarget.get(parent)
    }

    parent.style.position = options.positionType

    const isFull = document.body === parent

    options = {...new LoadingProps(), ...options}

    const instance = createComponent(loadingConstructor, {
      ...options,
      isFull
    }, options.loadingTemplateRef ? () => options.loadingTemplateRef : null)

    cacheTarget.set(parent, instance)

    instance.proxy.open()
    parent.appendChild(instance.proxy.$el)

    const close = instance.proxy.close
    instance.loadingInstance = instance.proxy
    instance.loadingInstance.close = () => {
      cacheTarget.delete(parent)
      close.apply(null, arguments)
    }

    return instance
  }
}

export default loading