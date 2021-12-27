import { h, render } from 'vue'
import { DrawerProps } from './drawer-types'
import Drawer from './drawer'

interface drawerInstance {
  hide(): void
}

export default class DrawerService {

  static show(props: DrawerProps): drawerInstance{
    let body: HTMLElement | null = document.body
    let div: HTMLDivElement | null = document.createElement('div')
    body.appendChild(div)
    let drawer = h(Drawer, { ...props }, { content: props.content })
    render(drawer, div)

    const hide = (): void => {
      render(null, div); 
      drawer = null;
      div && body.removeChild(div)
      div = null
      body = null
    }

    return { hide };
  }
}