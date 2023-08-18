import type { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue';

export type BasePlacement = 'top' | 'right' | 'bottom' | 'left';
export type PlaceStrategy = 'most-space' | 'no-space' ;

export const tooltipProps = {
  content: {
    type: String,
    default: '',
  },
  position: {
    type: [String, Array] as PropType<BasePlacement | Array<BasePlacement>>,
    default: ['top','right','bottom','left'],
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
  placeStrategy:{
    type: String as PropType<PlaceStrategy>,
    default:'no-space'
  },
  scrollElement:{
    type:[Object,String] as PropType<HTMLElement | 'auto'>
  }
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
