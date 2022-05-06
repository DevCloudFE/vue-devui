import { defineComponent } from 'vue';
import { flexibleOverlayProps, FlexibleOverlayProps } from './flexible-overlay-types';
import { useOverlay } from './use-flexible-overlay';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import './flexible-overlay.scss';

export const FlexibleOverlay = defineComponent({
  name: 'DFlexibleOverlay',
  inheritAttrs: false,
  props: flexibleOverlayProps,
  emits: ['update:modelValue', 'positionChange'],
  setup(props: FlexibleOverlayProps, { slots, attrs, emit, expose }) {
    const ns = useNamespace('flexible-overlay');
    const { arrowRef, overlayRef, updatePosition } = useOverlay(props, emit);
    expose({ updatePosition });

    return () =>
      props.modelValue && (
        <div ref={overlayRef} class={ns.b()} {...attrs}>
          {slots.default?.()}
          {props.showArrow && <div ref={arrowRef} class={ns.e('arrow')}></div>}
        </div>
      );
  },
});
