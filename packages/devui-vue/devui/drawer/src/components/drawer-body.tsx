import { defineComponent, inject, computed } from 'vue'

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
    const backdropCloseable: any = inject('backdropCloseable')
    const destroyOnHide: any = inject('destroyOnHide')

    const navRight = computed(() => position.value === 'right' ? { 'right': 0 } : { 'left': 0 })
    const navWidth = computed(() => isFullScreen.value ? '100vw' : width.value)

    const clickContent = (e) => {
      e.stopPropagation()
    }

    const handleDrawerClose = () => {
      if (!backdropCloseable.value) return;
      closeDrawer();
    }

    return {
      zindex,
      slots,
      isCover,
      navRight,
      navWidth,
      visible,
      clickContent,
      handleDrawerClose,
      destroyOnHide,
    }
  },

  render() {
    const {
      zindex, slots, isCover, navRight, navWidth, 
      visible, handleDrawerClose, destroyOnHide } = this

    if (destroyOnHide.value && !visible) {
      return null
    }

    const visibleVal = visible ? 'visible' : 'hidden'

    return (
      <div class="devui-drawer" style={{ zIndex: zindex, visibility : visibleVal }} onClick={handleDrawerClose} >
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