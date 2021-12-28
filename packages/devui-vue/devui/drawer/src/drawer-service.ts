import { h, render } from 'vue'
import { DrawerProps } from './drawer-types'
import Drawer from './drawer'

interface drawerInstance {
  hide(): void
  hideDirectly(): void
  destroy(): void
}

export default class DrawerService {
  static show(props: DrawerProps): drawerInstance {
    let body = document.body
    let div = document.createElement('div')
    body.appendChild(div)
    let drawer = null
    drawer = drawer
      ? (drawer.props.visible = true)
      : h(Drawer, { ...props }, { header: props.header, content: props.content })
    render(drawer, div)

    const hide = async () => {
      const beforeHidden = props.beforeHidden
      let result = (typeof beforeHidden === 'function' ? beforeHidden() : beforeHidden) ?? false
      if (result instanceof Promise) {
        result = await result
      }
      if (!result) hideDirectly()
    }

    const hideDirectly = () => {
      // TODO： 这么写可能有问题
      drawer = h(
        Drawer,
        { ...props, visible: false },
        { header: props.header, content: props.content }
      )
      render(drawer, div)
    }

    const destroy = () => {
      render(null, div)
      drawer = null
      div && body.removeChild(div)
      div = null
      body = null
    }

    return { hide, hideDirectly, destroy }
  }
}
