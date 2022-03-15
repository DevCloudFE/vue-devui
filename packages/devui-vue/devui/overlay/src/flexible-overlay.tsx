import { defineComponent } from 'vue';
import { flexibleOverlayProps, FlexibleOverlayProps } from './overlay-types';
import { useOverlay } from './use-flexible-overlay';
import './flexible-overlay.scss';

export const FlexibleOverlay = defineComponent({
  name: 'DFlexibleOverlay',
  inheritAttrs: false,
  props: flexibleOverlayProps,
  emits: ['update:modelValue', 'positionChange'],
  setup(props: FlexibleOverlayProps, { slots, attrs, emit }) {
    const { arrowRef, overlayRef } = useOverlay(props, emit);

    return () =>
      props.modelValue && (
        <div ref={overlayRef} class='devui-flexible-overlay' {...attrs}>
          {slots.default?.()}
          {props.showArrow && <div ref={arrowRef} class='devui-flexible-overlay-arrow'></div>}
        </div>
      );
  },
});
