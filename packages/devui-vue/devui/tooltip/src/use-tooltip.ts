import { onMounted, ref, toRefs, computed } from 'vue';
import type { Ref } from 'vue';
import { debounce } from 'lodash';
import { TooltipProps, BasePlacement, UseTooltipFn } from './tooltip-types';

const TransformOriginMap: Record<string, string> = {
  top: '50% calc(100% + 8px)',
  bottom: '50% -8px',
  left: 'calc(100% + 8px)',
  right: '-8px 50%',
};

export function useTooltip(origin: Ref, props: TooltipProps): UseTooltipFn {
  const { position, mouseEnterDelay, mouseLeaveDelay } = toRefs(props);
  const visible = ref<boolean>(false);
  const isEnter = ref<boolean>(false);
  const positionArr = computed(() => (typeof position.value === 'string' ? [position.value] : position.value));
  const placement = ref<BasePlacement>(positionArr.value[0]);
  const overlayStyles = computed(() => ({
    transformOrigin: TransformOriginMap[placement.value],
  }));
  const enter = debounce(() => {
    isEnter.value && (visible.value = true);
  }, mouseEnterDelay.value);
  const leave = debounce(() => {
    !isEnter.value && (visible.value = false);
  }, mouseLeaveDelay.value);

  const onMouseenter = () => {
    isEnter.value = true;
    enter();
  };
  const onMouseleave = () => {
    isEnter.value = false;
    leave();
  };
  const onPositionChange = (pos: BasePlacement) => {
    placement.value = pos;
  };

  onMounted(() => {
    origin.value.addEventListener('mouseenter', onMouseenter);
    origin.value.addEventListener('mouseleave', onMouseleave);
  });

  return { visible, placement, positionArr, overlayStyles, onPositionChange };
}
