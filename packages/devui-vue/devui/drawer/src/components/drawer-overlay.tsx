import { defineComponent, Transition } from 'vue';
import type { SetupContext } from 'vue';
import { drawerOverlayProps, DrawerOverlayProps } from '../drawer-types';
import './drawer-overlay.scss';

export default defineComponent({
  name: 'DDrawerOverlay',
  props: drawerOverlayProps,
  emits: ['click'],
  setup(props: DrawerOverlayProps, ctx: SetupContext) {
    const handleClick = (e: Event) => {
      ctx.emit('click', e);
    };
    return () => (
      <Transition name='drawer-overlay-fade'>{props.visible && <div class='devui-drawer-overlay' onClick={handleClick}></div>}</Transition>
    );
  },
});
