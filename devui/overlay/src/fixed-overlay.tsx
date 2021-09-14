import { defineComponent, ref, renderSlot, CSSProperties, PropType } from 'vue';
import { CommonOverlay } from './common-overlay';
import { overlayProps } from './overlay-types';
import { useOverlayLogic } from './utils';
import './overlay.scss';

export const FixedOverlay = defineComponent({
  name: 'DFixedOverlay',
  props: {
    ...overlayProps,
    overlayStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined,
    },
  },
  setup(props, ctx) {
    const { containerClass, panelClass, handleBackdropClick } =
      useOverlayLogic(props);

    const overlayRef = ref<HTMLDivElement | null>(null);
    const handleBubbleCancel = (event: Event) => (event.cancelBubble = true);

    return () => (
      <CommonOverlay>
        <div
          v-show={props.visible}
          class={containerClass.value}
          onClick={handleBackdropClick}
        >
          <div class={panelClass.value}>
            <div
              ref={overlayRef}
              class="d-overlay"
              style={props.overlayStyle}
              onClick={handleBubbleCancel}
            >
              {renderSlot(ctx.slots, 'default')}
            </div>
          </div>
        </div>
      </CommonOverlay>
    );
  },
});
