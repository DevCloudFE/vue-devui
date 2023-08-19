import { defineComponent, toRefs, withModifiers } from 'vue';
import { flexibleOverlayProps, FlexibleOverlayProps } from './flexible-overlay-types';
import { useOverlay } from './use-flexible-overlay';
import { useNamespace } from '@devui/shared/utils';
import './flexible-overlay.scss';

export const FlexibleOverlay = defineComponent({
  name: 'DFlexibleOverlay',
  inheritAttrs: false,
  props: flexibleOverlayProps,
  emits: ['update:modelValue', 'positionChange'],
  setup(props: FlexibleOverlayProps, { slots, attrs, emit, expose }) {
    const ns = useNamespace('flexible-overlay');
    const { clickEventBubble } = toRefs(props);
    const { arrowRef, overlayRef, styles,showOverlay, updatePosition } = useOverlay(props, emit);
    expose({ updatePosition });

    return () =>
      showOverlay.value && (
        <div
          ref={overlayRef}
          class={ns.b()}
          style={styles.value}
          {...attrs}
          onClick={withModifiers(() => ({}), [clickEventBubble.value ? '' : 'stop'])}
          onPointerup={withModifiers(() => ({}), ['stop'])}>
          {slots.default?.()}
          {props.showArrow && <div ref={arrowRef} class={ns.e('arrow')}></div>}
        </div>
      );
  },
});
