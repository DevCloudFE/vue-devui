import { defineComponent, ref, toRefs, Transition, Teleport } from 'vue';
import { dropdownProps, DropdownProps } from './dropdown-types';
import { useDropdown, useDropdownEvent, useOverlayProps } from './use-dropdown';
import { FlexibleOverlay } from '../../overlay';
import './dropdown.scss';

let dropdownId = 1;

export default defineComponent({
  name: 'DDropdown',
  inheritAttrs: false,
  props: dropdownProps,
  emits: ['toggle'],
  setup(props: DropdownProps, { slots, attrs, emit }) {
    const { visible, position, align, offset, showAnimation } = toRefs(props);
    const origin = ref<HTMLElement>();
    const dropdownRef = ref<HTMLElement>();
    const id = `dropdown_${dropdownId++}`;
    const isOpen = ref<boolean>(false);
    const currentPosition = ref('bottom');

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
    return () => (
      <>
        <div ref={origin} class='devui-dropdown-toggle'>
          {slots.default?.()}
        </div>
        <Teleport to='body'>
          <Transition name={showAnimation.value ? `devui-dropdown-fade-${currentPosition.value}` : ''}>
            <FlexibleOverlay
              v-model={overlayModelValue.value}
              v-show={overlayShowValue.value}
              origin={origin.value}
              position={position.value}
              align={align.value}
              offset={offset.value}
              onPositionChange={handlePositionChange}
              class={classes.value}
              style={styles.value}>
              <div ref={dropdownRef} class='devui-dropdown-menu-wrap' {...attrs}>
                {slots.menu?.()}
              </div>
            </FlexibleOverlay>
          </Transition>
        </Teleport>
      </>
    );
  },
});
