import { defineComponent, ref, renderSlot, CSSProperties, toRef } from 'vue';
import { CommonOverlay } from './common-overlay';
import { overlayProps } from './overlay-types';
import './overlay.scss';
import { overlayVisible } from './utils';

export const FixedOverlay = defineComponent({
  name: 'DFixedOverlay',
  props: {
    ...overlayProps,
    wrapperStyle: {
      type: Object as () => CSSProperties
    },
  },
  setup(props, ctx) {
    const visible = overlayVisible(toRef(props, 'backgroundBlock'));

    const clickBackground = (event: Event) => {
      event.preventDefault();

      props.backdropClick?.();
      if (props.backdropClose) {
        visible.value = false;
      }
    };

    const panelRef = ref<HTMLDivElement | null>(null);


    return () => {
      return (
        <CommonOverlay>
          <div
            v-show={visible.value}
            class={[
              'd-overlay-container',
              {
                [props.backgroundClass]: props.hasBackdrop,
                'd-overlay-container__disabled': !props.hasBackdrop
              }
            ]}
          >
            <div
              class={['d-overlay-panel', !props.hasBackdrop ? 'd-overlay-container__disabled' : '']}
              style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', display: 'flex' }}
              onClick={clickBackground}
            >
              <div
                ref={panelRef}
                class="d-overlay"
                style={props.wrapperStyle}
                onClick={event => event.cancelBubble = true}
              >
                {renderSlot(ctx.slots, 'default')}
              </div>
            </div>
          </div>
        </CommonOverlay>
      )
    }
  }
});
