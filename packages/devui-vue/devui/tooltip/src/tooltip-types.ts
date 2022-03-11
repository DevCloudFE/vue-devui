import type { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue';

export type BasePlacement = 'top' | 'right' | 'bottom' | 'left';

export const tooltipProps = {
  content: {
    type: String,
    default: '',
  },
  position: {
    type: [String, Array] as PropType<BasePlacement | Array<BasePlacement>>,
    default: 'top',
  },
  showAnimation: {
    type: Boolean,
    default: true,
  },
  mouseEnterDelay: {
    type: Number,
    default: 150,
  },
  mouseLeaveDelay: {
    type: Number,
    default: 100,
  },
};

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>;

export type UseTooltipFn = {
  visible: Ref<boolean>;
  placement: Ref<BasePlacement>;
  positionArr: ComputedRef<BasePlacement[]>;
  overlayStyles: ComputedRef<Record<string, string>>;
  onPositionChange: (pos: BasePlacement) => void;
};
