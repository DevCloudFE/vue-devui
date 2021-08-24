import { defineComponent, renderSlot, Teleport, Transition } from 'vue';
import './overlay.scss';

export const CommonOverlay = defineComponent({
  setup(props, ctx) {
    return () => (
      <Teleport to="#d-overlay-anchor">
        <Transition name="d-overlay-fade">
          {renderSlot(ctx.slots, 'defalut')}
        </Transition>
      </Teleport>
    )
  }
});
