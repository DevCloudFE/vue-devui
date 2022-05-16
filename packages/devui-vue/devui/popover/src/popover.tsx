import { defineComponent, toRefs, ref, Teleport, Transition, watch } from 'vue';
import { FlexibleOverlay } from '../../overlay';
import { popoverProps, PopoverProps } from './popover-types';
import { usePopover, usePopoverEvent } from './use-popover';
import PopoverIcon from './popover-icon';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './popover.scss';

export default defineComponent({
  name: 'DPopover',
  inheritAttrs: false,
  props: popoverProps,
  emits: ['show', 'hide'],
  setup(props: PopoverProps, { slots, attrs, emit }) {
    const { content, popType, position, align, offset, showAnimation } = toRefs(props);
    const origin = ref<HTMLElement>();
    const popoverRef = ref<HTMLElement>();
    const visible = ref(false);
    const { placement, handlePositionChange, onMouseenter, onMouseleave } = usePopoverEvent(props, visible, origin);
    const { overlayStyles } = usePopover(props, visible, placement, origin, popoverRef);
    const ns = useNamespace('popover');
    watch(visible, (newVal) => {
      if (newVal) {
        emit('show');
      } else {
        emit('hide');
      }
    });

    return () => (
      <>
        <div ref={origin} class={ns.e('reference')}>
          {slots.reference?.()}
        </div>
        <Teleport to="body">
          <Transition name={showAnimation.value ? ns.m(`fade-${placement.value}`) : ''}>
            <FlexibleOverlay
              v-model={visible.value}
              ref={popoverRef}
              origin={origin.value}
              position={position.value}
              align={align.value}
              offset={offset.value}
              class={[ns.e('content'), popType.value !== 'default' ? 'is-icon' : '']}
              show-arrow
              is-arrow-center={false}
              style={overlayStyles.value}
              {...attrs}
              onPositionChange={handlePositionChange}
              onMouseenter={onMouseenter}
              onMouseleave={onMouseleave}>
              <PopoverIcon type={popType.value} />
              {slots.content?.() || <span>{content.value}</span>}
            </FlexibleOverlay>
          </Transition>
        </Teleport>
      </>
    );
  },
});
