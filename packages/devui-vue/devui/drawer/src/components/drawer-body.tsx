import { defineComponent, inject, computed, toRefs, onUnmounted } from 'vue'

import './drawer-body.scss'

export default defineComponent({
  name: 'DrawerBody',
  setup(props, { slots }) {
    const isFullScreen: any = inject('isFullScreen')
    const closeDrawer: any = inject('closeDrawer')
    const zindex: number = inject('zindex')
    const isCover: boolean = inject('isCover')
    const position: any = inject('position')
    const width: any = inject('width')
    const visible: boolean = inject('visible')

    const navRight = computed(() => position.value === 'right' ? { 'right': 0 } : { 'left': 0 })
    const navWidth = computed(() => isFullScreen.value ? '100vw' : width.value)

    let clickContent = (e) => {
      e.stopPropagation()
    }

    return {
      closeDrawer,
      zindex,
      slots,
      isCover,
      navRight,
      navWidth,
      visible,
      clickContent,
    }
  },

  render() {
    const { zindex, closeDrawer, slots, isCover, navRight, navWidth, visible } = this

    if (!visible) return null

    return (
      <div class="devui-drawer" style={{ zIndex: zindex }} onClick={closeDrawer} >
        {isCover ? <div class="devui-overlay-backdrop" /> : null}
        <div class="devui-overlay-wrapper">
          <div class="devui-drawer-nav" style={{ 'width': navWidth, ...navRight }}>
            <div class="devui-drawer-content" onClick={this.clickContent}>
              {slots.default ? slots.default() : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
})