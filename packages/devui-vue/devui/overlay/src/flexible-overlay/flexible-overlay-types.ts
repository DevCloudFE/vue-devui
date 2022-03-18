import type { ExtractPropTypes, PropType, Ref } from 'vue';

export type Placement =
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

export type Alignment = 'start' | 'end';
export type OffsetOptions = { mainAxis?: number; crossAxis?: number };

export type Point = { x?: number; y?: number };

export type UseOverlayFn = { arrowRef: Ref<HTMLElement | undefined>; overlayRef: Ref<HTMLElement | undefined> };

export type EmitEventFn = (event: 'positionChange' | 'update:modelValue', result?: unknown) => void;

export const flexibleOverlayProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  origin: {
    type: Object as PropType<HTMLElement>,
    require: true,
  },
  position: {
    type: Array as PropType<Array<Placement>>,
    default: ['bottom'],
  },
  offset: {
    type: [Number, Object] as PropType<number | OffsetOptions>,
    default: 8,
  },
  align: {
    type: String as PropType<Alignment> | null,
    default: null,
  },
  showArrow: {
    type: Boolean,
    default: false,
  },
  isArrowCenter: {
    type: Boolean,
    default: true,
  },
};

export type FlexibleOverlayProps = ExtractPropTypes<typeof flexibleOverlayProps>;
