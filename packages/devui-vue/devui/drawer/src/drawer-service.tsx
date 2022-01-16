import { createApp } from 'vue'
import { DrawerProps } from './drawer-types'

import DDrawer from './drawer'

interface drawerInstance {
  hide(): void
  hideDirectly(): void
  destroy(): void
}

function createDrawerApp(props: DrawerProps, drawer: drawerInstance, el: HTMLElement) {
  if (drawer) {
    return drawer
  }
  const res = createApp(
    <DDrawer {...props}>{{ header: props.header, content: props.content }}</DDrawer>
  )
  res.mount(el)
  return res
}

export default class DrawerService {
  static create(props: DrawerProps, drawer: drawerInstance): drawerInstance {
    if (!drawer) {
      drawer = new Drawer(props)
    }
    return drawer
  }
}

class Drawer {
  private drawer: any = null
  private div: HTMLElement = null
  private props: DrawerProps = null

  constructor(props: DrawerProps) {
    this.props = props
  }

  public show(): void {
    this.div = document.createElement('div')
    this.drawer = createDrawerApp(this.props, this.drawer, this.div)
    this.drawer._instance.props.visible = true
  }

  public hide = async (): Promise<void> => {
    const beforeHidden = this.props.beforeHidden
    let result = (typeof beforeHidden === 'function' ? beforeHidden() : beforeHidden) ?? false
    if (result instanceof Promise) {
      result = await result
    }
    if (!result) this.hideDirectly()
  }

  public hideDirectly = (): void => {
    this.drawer._instance.props.visible = false
    this.div.remove()
  }

  public destroy = (): void => {
    this.drawer.unmount()
    this.drawer = null
    this.div.remove()
  }
}
