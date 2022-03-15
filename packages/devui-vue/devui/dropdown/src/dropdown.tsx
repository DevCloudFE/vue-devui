import { defineComponent, ref, toRefs, Transition, Teleport, computed } from 'vue';
import { dropdownProps, DropdownProps } from './dropdown-types';
import { useDropdown, useDropdownEvent } from './use-dropdown';
import { FlexibleOverlay } from '../../overlay';
import './dropdown.scss';

let dropdownId = 1;

export default defineComponent({
  name: 'DDropdown',
  inheritAttrs: false,
  props: dropdownProps,
  emits: ['toggle'],
  setup(props: DropdownProps, { slots, attrs, emit }) {
    const { visible, position, align, offset } = toRefs(props);
    const origin = ref<HTMLElement>();
    const dropdownRef = ref<HTMLElement>();
    const id = `dropdown_${dropdownId++}`;
    const isOpen = ref<boolean>(false);
    const currentPosition = ref('bottom');
    const handlePositionChange = (pos) => {
      currentPosition.value = pos.includes('top') || pos.includes('end') ? 'top' : 'bottom';
    };
    const styles = computed(() => ({
      transformOrigin: currentPosition.value === 'top' ? '0% 100%' : '0% 0%',
    }));
    const classes = computed(() => ({
      'fade-in-bottom': isOpen.value && currentPosition.value === 'bottom',
      'fade-in-top': isOpen.value && currentPosition.value === 'top',
    }));
    useDropdownEvent({
      id,
      isOpen,
      origin,
      dropdownRef,
      props,
      emit,
    });
    useDropdown(id, visible, isOpen, origin, dropdownRef, currentPosition, emit);
    return () => (
      <>
        <div ref={origin} class='devui-dropdown-toggle'>
          {slots.default?.()}
        </div>
        <Teleport to='body'>
          <Transition name={`devui-dropdown-fade-${currentPosition.value}`}>
            <FlexibleOverlay
              v-model={isOpen.value}
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
