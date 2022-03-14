import { defineComponent, ref, toRefs, Transition, Teleport, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { FlexibleOverlay } from '../../overlay';
import { dropdownMenuProps, DropdownMenuProps } from './dropdown-menu-types';

export default defineComponent({
  name: 'DDropdownMenu',
  inheritAttrs: false,
  props: dropdownMenuProps,
  emits: ['update:modelValue'],
  setup(props: DropdownMenuProps, { slots, attrs, emit }) {
    const { modelValue, origin, position, align, offset, clickOutside } = toRefs(props);
    const dropdownMenuRef = ref(null);

    onClickOutside(dropdownMenuRef, (value) => {
      if (clickOutside.value?.() && !origin.value.contains(value.target)) {
        emit('update:modelValue', false);
      }
    });

    const currentPosition = ref('bottom');
    const handlePositionChange = (pos) => {
      currentPosition.value = pos.split('-')[0] === 'top' ? 'top' : 'bottom';
    };
    const styles = computed(() => ({
      transformOrigin: currentPosition.value === 'top' ? '0% 100%' : '0% 0%',
    }));

    return () => (
      <Teleport to='body'>
        <Transition name={`devui-dropdown-fade-${currentPosition.value}`}>
          <FlexibleOverlay
            v-model={modelValue.value}
            origin={origin?.value}
            position={position.value}
            align={align.value}
            offset={offset.value}
            onPositionChange={handlePositionChange}
            style={styles.value}>
            <div ref={dropdownMenuRef} class='devui-dropdown-menu-wrap' {...attrs}>
              {slots.default?.()}
            </div>
          </FlexibleOverlay>
        </Transition>
      </Teleport>
    );
  },
});
