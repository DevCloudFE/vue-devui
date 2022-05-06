import { defineComponent, renderSlot, Teleport, Transition } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './base-overlay.scss';

export const CommonOverlay = defineComponent({
  setup(props, ctx) {
    const ns = useNamespace('overlay');

    return () => (
      <Teleport to="#d-overlay-anchor">
        <Transition name={ns.e('fade')}>{renderSlot(ctx.slots, 'default')}</Transition>
      </Teleport>
    );
  },
});
