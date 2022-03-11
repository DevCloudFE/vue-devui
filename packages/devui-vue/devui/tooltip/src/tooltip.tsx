import { defineComponent, ref, Teleport, toRefs, Transition } from 'vue';
import { FlexibleOverlay } from '../../overlay';
import { TooltipProps, tooltipProps } from './tooltip-types';
import { useTooltip } from './use-tooltip';
import './tooltip.scss';

export default defineComponent({
  name: 'DTooltip',
  props: tooltipProps,
  setup(props: TooltipProps, { slots }) {
    const { showAnimation, content } = toRefs(props);
    const origin = ref<HTMLElement>();
    const tooltipRef = ref<HTMLElement>();
    const { visible, placement, positionArr, overlayStyles, onPositionChange } = useTooltip(origin, props);

    return () => (
      <>
        <div ref={origin} class='devui-tooltip-reference'>
          {slots.default?.()}
        </div>
        <Teleport to='body'>
          <Transition name={showAnimation.value ? `devui-tooltip-fade-${placement.value}` : ''}>
            <FlexibleOverlay
              v-model={visible.value}
              ref={tooltipRef}
              class='devui-tooltip'
              origin={origin.value}
              position={positionArr.value}
              offset={6}
              show-arrow
              style={overlayStyles.value}
              onPositionChange={onPositionChange}>
              <span innerHTML={content.value}></span>
            </FlexibleOverlay>
          </Transition>
        </Teleport>
      </>
    );
  },
});
