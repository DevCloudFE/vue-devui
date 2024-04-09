import type { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue';

export type Alignment = 'start' | 'end';
export type BasePlacement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';

export const tooltipProps = {
  content: {
    type: String,
    default: '',
  },
  position: {
    type: [String, Array] as PropType<BasePlacement | Array<BasePlacement>>,
    default: 'top',
  },
  align: {
    type: String as PropType<Alignment> | null,
    default: null,
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
  enterable: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hideAfter: {
    type: Number,
    default: 0,
  },
};

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>;

export type UseTooltipFn = {
  visible: Ref<boolean>;
  placement: Ref<BasePlacement>;
  positionArr: ComputedRef<BasePlacement[]>;
  overlayStyles: ComputedRef<Record<string, string>>;
  onPositionChange: (pos: BasePlacement) => void;
  onMouseenter: () => void;
  onMouseleave: () => void;
  onMouseenterOverlay: () => void;
};
