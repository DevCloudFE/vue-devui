import { h, render } from 'vue'
import { DrawerProps } from './drawer-types'
import Drawer from './drawer'

interface drawerInstance {
  hide(): void
}

export default class DrawerService {

  static $body: HTMLElement | null = document.body
  
  static show(props: DrawerProps): drawerInstance{
    let div: HTMLDivElement | null = null
    div = document.createElement('div')
    this.$body.appendChild(div)
    let drawer = h(Drawer, { ...props }, { default: props.defaultContent })
    render(drawer, div)

    const hide = (): void => {
      render(null, div); 
      drawer = null;
      div && this.$body.removeChild(div)
      div = null
    }

    return { hide };
  }
}