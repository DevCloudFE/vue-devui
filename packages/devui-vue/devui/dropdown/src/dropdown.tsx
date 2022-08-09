import { defineComponent, ref, toRefs, Transition, Teleport, watch, nextTick, provide } from 'vue';
import { dropdownProps, DropdownProps } from './dropdown-types';
import { POPPER_TRIGGER_TOKEN } from '../../shared/components/popper-trigger/src/popper-trigger-types';
import { useDropdown, useDropdownEvent, useOverlayProps } from './use-dropdown';
import { FlexibleOverlay } from '../../overlay';
import { PopperTrigger } from '../../shared/components/popper-trigger';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './dropdown.scss';

let dropdownId = 1;

export default defineComponent({
  name: 'DDropdown',
  inheritAttrs: false,
  props: dropdownProps,
  emits: ['toggle'],
  setup(props: DropdownProps, { slots, attrs, emit, expose }) {
    const { visible, position, align, offset, destroyOnHide, shiftOffset, showAnimation } = toRefs(props);
    const origin = ref<HTMLElement | undefined>();
    const dropdownRef = ref<HTMLElement | undefined>();
    const overlayRef = ref();
    const id = `dropdown_${dropdownId++}`;
    const isOpen = ref<boolean>(false);
    const currentPosition = ref('bottom');
    const ns = useNamespace('dropdown');
    provide(POPPER_TRIGGER_TOKEN, origin);

    useDropdownEvent({
      id,
      isOpen,
      origin,
      dropdownRef,
      props,
      emit,
    });
    useDropdown(id, visible, isOpen, origin, dropdownRef, currentPosition, emit);
    const { overlayModelValue, overlayShowValue, styles, classes, handlePositionChange } = useOverlayProps(props, currentPosition, isOpen);

    watch(overlayShowValue, (overlayShowValueVal) => {
      nextTick(() => {
        if (!destroyOnHide.value && overlayShowValueVal) {
          overlayRef.value.updatePosition();
        }
      });
    });

    expose({
      updatePosition: () => overlayRef.value.updatePosition(),
    });

    return () => (
      <>
        <PopperTrigger>{slots.default?.()}</PopperTrigger>
        <Teleport to="body">
          <Transition name={showAnimation.value ? ns.m(`fade-${currentPosition.value}`) : ''}>
            <FlexibleOverlay
              v-model={overlayModelValue.value}
              v-show={overlayShowValue.value}
              ref={overlayRef}
              origin={origin.value}
              position={position.value}
              align={align.value}
              offset={offset.value}
              shiftOffset={shiftOffset?.value}
              onPositionChange={handlePositionChange}
              click-event-bubble
              class={classes.value}
              style={styles.value}>
              <div ref={dropdownRef} class={ns.e('menu-wrap')} {...attrs}>
                {slots.menu?.()}
              </div>
            </FlexibleOverlay>
          </Transition>
        </Teleport>
      </>
    );
  },
});
