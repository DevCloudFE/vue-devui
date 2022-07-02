import { defineComponent, ref, toRefs, Transition, Teleport, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { FlexibleOverlay } from '../../overlay';
import { dropdownMenuProps, DropdownMenuProps } from './dropdown-menu-types';
import { useNamespace } from '../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'DDropdownMenu',
  inheritAttrs: false,
  props: dropdownMenuProps,
  emits: ['update:modelValue'],
  setup(props: DropdownMenuProps, { slots, attrs, emit }) {
    const { modelValue, origin, position, align, offset, clickOutside, showAnimation, overlayClass } = toRefs(props);
    const dropdownMenuRef = ref(null);
    const ns = useNamespace('dropdown');

    onClickOutside(dropdownMenuRef, (value) => {
      if (clickOutside.value?.() && !origin?.value?.contains(value.target as Node)) {
        emit('update:modelValue', false);
      }
    });

    const currentPosition = ref('bottom');
    const handlePositionChange = (pos: string) => {
      currentPosition.value = pos.split('-')[0] === 'top' ? 'top' : 'bottom';
    };
    const styles = computed(() => ({
      transformOrigin: currentPosition.value === 'top' ? '0% 100%' : '0% 0%',
    }));

    return () => (
      <Teleport to="body">
        <Transition name={showAnimation.value ? ns.m(`fade-${currentPosition.value}`) : ''}>
          <FlexibleOverlay
            v-model={modelValue.value}
            origin={origin?.value}
            position={position.value}
            align={align.value}
            offset={offset.value}
            onPositionChange={handlePositionChange}
            class={overlayClass.value}
            style={styles.value}>
            <div ref={dropdownMenuRef} class={ns.e('menu-wrap')} {...attrs}>
              {slots.default?.()}
            </div>
          </FlexibleOverlay>
        </Transition>
      </Teleport>
    );
  },
});
