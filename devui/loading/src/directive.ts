/* eslint-disable */
import { defineComponent } from 'vue'
import Loading from './loading'
import { LoadingProps, BindingType, TargetHTMLElement } from './types'

import { createComponent, unmountComponent } from './component'

const loadingConstructor = defineComponent(Loading)

const cacheInstance = new WeakSet()

const isEmpty = (val: any) => {
  if (!val) return true

  if (Array.isArray(val)) return val.length === 0

  if (val instanceof Set || val instanceof Map) return val.size === 0

  if (val instanceof Promise) return false

  if (typeof val === 'object') {
    try {
      return Object.keys(val).length === 0
    } catch(e) {
      return false
    }
  }

  return false
}

const getType = (vari: any) => {
  return Object.prototype.toString.call(vari).slice(8, -1).toLowerCase()
}

const isPromise = (value: any) => {
  const type = getType(value)

  switch(type) {
    case 'promise':
      return [value]
    case 'array':
      if (value.some((val: any) => getType(val) !== 'promise')) {
        console.error(new TypeError('Binding values should all be of type Promise'))
        return 'error'
      }
      return value
    default:
      return false
  }
}

const unmount = (el: TargetHTMLElement) => {
  cacheInstance.delete(el)
  el.instance.proxy.close()
  unmountComponent(el.instance)
}

const toggleLoading = (el: TargetHTMLElement, binding: BindingType) => {
  if (binding.value) {
    const vals: Promise<any>[] | false | 'error' = isPromise(binding.value)
    if (vals === 'error') return

    el.instance.proxy.open()
    el.appendChild(el.mask!)
    cacheInstance.add(el)

    if (vals) {
      Promise.all(vals)
      // eslint不允许空的then执行体 @mrundef-210810
      // .then((res: Array<boolean>) => {
      // })
      .catch((err: any) => {
        console.error(new Error('Promise handling errors'), err)
      }).finally(() => {
        unmount(el)
      })
    }
  } else {
    unmount(el)
  }
}

const removeAttribute = (el: TargetHTMLElement) => {
  el.removeAttribute('zindex')
  el.removeAttribute('positiontype')
  el.removeAttribute('backdrop')
  el.removeAttribute('message')
  el.removeAttribute('view')
  el.removeAttribute('loadingtemplateref')
}

const handleProps = (el: TargetHTMLElement, vprops: LoadingProps) => {
  const props = {
    ...new LoadingProps(),
    ...vprops
  }

  const loadingTemplateRef = props.loadingTemplateRef

  const loadingInstance = createComponent(
    loadingConstructor,
    { ...props },
    loadingTemplateRef ? () => loadingTemplateRef : null
  )

  el.style.position = props.positionType!
  el.options = props
  el.instance = loadingInstance
  el.mask = loadingInstance.proxy.$el
}

const loadingDirective = {
  mounted: function (el: TargetHTMLElement, binding: BindingType, vnode: any) {

    handleProps(el, vnode.props)

    removeAttribute(el)

    !isEmpty(binding.value) && toggleLoading(el, binding)
  },

  updated: function (el: TargetHTMLElement, binding: BindingType, vnode: any) {

    if ((!isEmpty(binding.value) && cacheInstance.has(el)) ||
        (isEmpty(binding.value) && !cacheInstance.has(el))) return

    !cacheInstance.has(el) && handleProps(el, vnode.props)
    
    removeAttribute(el)

    toggleLoading(el, binding)
  },
  // eslint不允许控的unmounted执行体
  // unmounted: function () { }
}

export default loadingDirective
