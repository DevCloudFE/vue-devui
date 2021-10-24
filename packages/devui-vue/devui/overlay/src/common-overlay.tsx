import { defineComponent, renderSlot, Teleport, Transition } from 'vue';
import './overlay.scss';

export const CommonOverlay = defineComponent({
  setup(props, ctx) {
    return () => (
      <Teleport to="#d-overlay-anchor">
        <Transition name="devui-overlay-fade">
          {renderSlot(ctx.slots, 'default')}
        </Transition>
      </Teleport>
    );
  },
});
