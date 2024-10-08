import { defineComponent, toRefs, Teleport, Transition, computed } from 'vue';
import { drawerProps, DrawerProps } from './drawer-types';
import DrawerOverlay from './components/drawer-overlay';
import { useDrawer } from './use-drawer';
import './drawer.scss';

export default defineComponent({
  name: 'DDrawer',
  inheritAttrs: false,
  props: drawerProps,
  emits: ['close', 'update:modelValue', 'open'],
  setup(props: DrawerProps, { emit, slots, attrs }) {
    const { showOverlay, modelValue, position, appendToBody, width } = toRefs(props);
    const drawerWidth = computed(() => {
      if (width?.value !== undefined) {
        return typeof width.value === 'number' ? `${width.value}px` : width.value;
      }
      return undefined;
    });
    const { overlayRef, drawerRef, drawerClasses, overlayZIndex, drawerZIndex, handleOverlayClick } = useDrawer(props, emit);
    return () => (
      <Teleport to="body" disabled={!appendToBody.value}>
        {showOverlay.value && (
          <DrawerOverlay visible={modelValue.value} ref={overlayRef} style={{ zIndex: overlayZIndex.value }} onClick={handleOverlayClick} />
        )}
        <Transition name={`drawer-fly-${position.value}`}>
          {modelValue.value && (
            <div ref={drawerRef} class={drawerClasses.value} style={{ zIndex: drawerZIndex.value, width: drawerWidth.value }} {...attrs}>
              {slots.default?.()}
            </div>
          )}
        </Transition>
      </Teleport>
    );
  },
});
