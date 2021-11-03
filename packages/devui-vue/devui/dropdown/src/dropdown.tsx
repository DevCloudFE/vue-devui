import { defineComponent, watch, ref, cloneVNode, toRefs } from 'vue'
import { dropdownProps, DropdownProps } from './dropdown-types'
import { FlexibleOverlay } from '../../overlay';
import { getElement } from '../../shared/util/dom';

import './dropdown.scss'
import { useDropdown } from './use-dropdown';


export default defineComponent({
  name: 'DDropdown',
  props: dropdownProps,
  emits: [],
  setup(props: DropdownProps, ctx) {
    const {
      isOpen,
      origin,
      trigger,
      closeOnMouseLeaveMenu,
    } = toRefs(props);

    const visible = ref<boolean>(false);
    watch(isOpen, (value) => {
      visible.value = value;
    }, { immediate: true });

    const position = {
      originX: 'left',
      originY: 'bottom',
      overlayX: 'left',
      overlayY: 'top'
    } as const;

    const { dropdownEl } = useDropdown({
      visible,
      origin,
      trigger,
      closeOnMouseLeaveMenu,
    });

    return () => {
      // let vnodes = ctx.slots.default?.() ?? [];
      return (
        <>
          <FlexibleOverlay
            origin={props.origin}
            v-model:visible={visible.value}
            position={position}
            hasBackdrop={false}
          >
            <div ref={dropdownEl} style="width:100vw">
              {ctx.slots.default?.()}
            </div>
          </FlexibleOverlay>
        </>
      )
    };
  }
})
