import { computed, defineComponent, provide, ref, Teleport, toRefs, Transition } from 'vue';
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
    const { showAnimation, content, overlayClass, teleport } = toRefs(props);
    const origin = ref<HTMLElement>();
    const tooltipRef = ref<HTMLElement>();
    const { visible, placement, positionArr, overlayStyles, onPositionChange, onMouseleave, onMouseenterOverlay } = useTooltip(
      origin,
      props
    );
    const ns = useNamespace('tooltip');
    const className = computed(() => ({
      [ns.b()]: true,
      [ns.m(placement.value)]: true,
      [ns.m('with-content')]: slots.content,
      [overlayClass.value]: true,
    }));
    provide(POPPER_TRIGGER_TOKEN, origin);

    return () => (
      <>
        <PopperTrigger>{slots.default?.()}</PopperTrigger>
        <Teleport to={teleport.value}>
          <Transition name={showAnimation.value ? ns.m(`fade-${placement.value}`) : ''}>
            <FlexibleOverlay
              v-model={visible.value}
              ref={tooltipRef}
              class={className.value}
              origin={origin.value}
              position={positionArr.value}
              offset={6}
              show-arrow
              style={overlayStyles.value}
              onPositionChange={onPositionChange}
              onMouseenter={onMouseenterOverlay}
              onMouseleave={onMouseleave}>
              {slots.content ? slots.content?.() : <span>{content.value}</span>}
            </FlexibleOverlay>
          </Transition>
        </Teleport>
      </>
    );
  },
});
