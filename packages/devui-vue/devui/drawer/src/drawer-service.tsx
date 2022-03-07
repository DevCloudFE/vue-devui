import { createApp } from 'vue'
import { DrawerProps } from './drawer-types'

import DDrawer from './drawer'
import {  omit } from 'lodash-es'

interface drawerInstance {
  hide(): void
  hideDirectly(): void
  destroy(): void
}

function createDrawerApp(props: DrawerProps, drawer: drawerInstance, el: HTMLElement) {
  if (drawer) {
    return drawer
  }
  const restProps = omit(props, ['header', 'content', 'visible'])
  
  const res = createApp(
    // BUG: this function generates a new app, v-model instructor of template is like not working
    // TODO: could be fixed by using self-defined header slot
    <DDrawer v-model={[props.visible, 'visible']} {...restProps}>{{ header: props.header, content: props.content }}</DDrawer>
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
    if (!this.drawer) {
      this.div = document.createElement('div')
      this.drawer = createDrawerApp(this.props, this.drawer, this.div)
    }
    // TODO: this is a hack, need to find a better way. (the row 62)
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
    // this.div.remove()
  }

  public destroy = (): void => {
    // when drawer is null, it has been destroyed already and no need to destroy again
    if (this.drawer) {
      this.drawer.unmount()
      this.drawer = null
      this.div.remove()
    }
  }
}
