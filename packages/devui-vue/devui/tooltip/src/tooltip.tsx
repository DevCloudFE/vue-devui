import { defineComponent, provide, ref, Teleport, toRefs, Transition } from 'vue';
import { FlexibleOverlay } from '../../overlay';
import { PopperTrigger } from '../../shared/components/popper-trigger';
import { TooltipProps, tooltipProps } from './tooltip-types';
import { POPPER_TRIGGER_TOKEN } from '../../shared/components/popper-trigger/src/popper-trigger-types';
import { useTooltip } from './use-tooltip';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './tooltip.scss';

export default defineComponent({
  name: 'DTooltip',
  props: tooltipProps,
  setup(props: TooltipProps, { slots }) {
    const { showAnimation, content } = toRefs(props);
    const origin = ref<HTMLElement>();
    const tooltipRef = ref<HTMLElement>();
    const { visible, placement, positionArr, overlayStyles, onPositionChange, onMouseleave, onMouseenterOverlay } = useTooltip(
      origin,
      props
    );
    const ns = useNamespace('tooltip');
    provide(POPPER_TRIGGER_TOKEN, origin);

    return () => (
      <>
        <PopperTrigger>{slots.default?.()}</PopperTrigger>
        <Teleport to="body">
          <Transition name={showAnimation.value ? ns.m(`fade-${placement.value}`) : ''}>
            <FlexibleOverlay
              v-model={visible.value}
              ref={tooltipRef}
              class={ns.b()}
              origin={origin.value}
              position={positionArr.value}
              offset={6}
              show-arrow
              style={overlayStyles.value}
              onPositionChange={onPositionChange}
              onMouseenter={onMouseenterOverlay}
              onMouseleave={onMouseleave}>
              <span innerHTML={content.value}></span>
            </FlexibleOverlay>
          </Transition>
        </Teleport>
      </>
    );
  },
});
