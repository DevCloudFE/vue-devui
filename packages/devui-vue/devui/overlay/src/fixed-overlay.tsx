import { defineComponent, renderSlot } from 'vue';
import { CommonOverlay } from './common-overlay';
import { fixedOverlayProps, FixedOverlayProps, overlayEmits } from './overlay-types';
import { useOverlayLogic } from './utils';
import './overlay.scss';

export const FixedOverlay = defineComponent({
  name: 'DFixedOverlay',
  props: fixedOverlayProps,
  emits: overlayEmits,
  setup(props: FixedOverlayProps, ctx) {
    const { backgroundClass, overlayClass, handleBackdropClick, handleOverlayBubbleCancel } = useOverlayLogic(props, ctx);

    return () => (
      <CommonOverlay>
        {props.visible && (
          <div class={backgroundClass.value} style={props.backgroundStyle} onClick={handleBackdropClick}>
            <div class={overlayClass.value} style={props.overlayStyle} onClick={handleOverlayBubbleCancel}>
              {renderSlot(ctx.slots, 'default')}
            </div>
          </div>
        )}
      </CommonOverlay>
    );
  },
});
