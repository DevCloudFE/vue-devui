import { defineComponent, ref, renderSlot, CSSProperties, PropType } from 'vue';
import { CommonOverlay } from './common-overlay';
import { fixedOverlayProps, FixedOverlayProps } from './overlay-types';
import { useOverlayLogic } from './utils';
import './overlay.scss';

export const FixedOverlay = defineComponent({
  name: 'DFixedOverlay',
  props: fixedOverlayProps,
  setup(props: FixedOverlayProps, ctx) {
    const {
      backgroundClass,
      overlayClass,
      handleBackdropClick,
      handleOverlayBubbleCancel
    } = useOverlayLogic(props);

    return () => (
      <CommonOverlay>
        <div
          v-show={props.visible}
          class={backgroundClass.value}
          style={props.backgroundStyle}
          onClick={handleBackdropClick}
        >
          <div
            class={overlayClass.value}
            style={props.overlayStyle}
            onClick={handleOverlayBubbleCancel}
          >
            {renderSlot(ctx.slots, 'default')}
          </div>
        </div>
      </CommonOverlay>
    );
  },
});
