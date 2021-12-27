import { createApp } from 'vue'
import { DrawerProps } from './drawer-types'
import Drawer from './drawer'


function createDrawerApp(props: DrawerProps) {
  return createApp(Drawer, { ...props })
}

export default class DrawerService {

  static $body: HTMLElement | null = document.body
  static $div: HTMLDivElement | null = null
  static drawer = null;

  static show(props: DrawerProps): void{
    this.$div = document.createElement('div')
    this.$body.appendChild(this.$div)
    this.drawer = createDrawerApp(props)
    this.drawer.mount(this.$div)
  }

  static hide(): void {
    this.drawer?.unmount();
    this.drawer = null;
    if (this.$div) {
      this.$body.removeChild(this.$div)
    }
    this.$div = null
  }


}