import { defineComponent, watch, ref, toRefs, Transition, computed } from 'vue'
import { dropdownProps, DropdownProps } from './dropdown-types'
import { useDropdown } from './use-dropdown';

import { FlexibleOverlay } from '../../overlay';

import './dropdown.scss'

export default defineComponent({
  name: 'DDropdown',
  props: dropdownProps,
  emits: [],
  setup(props: DropdownProps, ctx) {
    const {
      isOpen,
      origin,
      trigger,
      closeScope,
      closeOnMouseLeaveMenu,
    } = toRefs(props);

    const visible = ref<boolean>(false);
    watch(isOpen, (value) => {
      visible.value = value;
    }, { immediate: true });

    const position = {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top'
    } as const;

    const { dropdownEl } = useDropdown({
      visible,
      origin,
      trigger,
      closeScope,
      closeOnMouseLeaveMenu,
    });

    const animatedVisible = computed(() => {
      return props.showAnimation ? visible.value : true;
    });

    const wrapStyle = computed(() => typeof props.width === 'string' ? {
      width: props.width,
    }: {
      width: `${props.width}px`,
    });
 
    return () => (
      <FlexibleOverlay
        origin={props.origin}
        v-model:visible={visible.value}
        position={position}
        hasBackdrop={false}
      >
        <Transition name="devui-dropdown-fade">
          <div 
            ref={dropdownEl}
            class="devui-dropdown-menu-wrap" 
            style={wrapStyle.value}
            v-show={animatedVisible.value} 
          >
            {ctx.slots.default?.()}
          </div>
        </Transition>
      </FlexibleOverlay>
    );
  }
})
