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

export type EmitEventFn = (event: 'positionChange' | 'update:modelValue', result?: unknown) => void;

export interface Rect {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

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
  shiftOffset: {
    type: Number,
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
  clickEventBubble: {
    type: Boolean,
    default: false,
  },
  // 是否和宿主元素的宽度保持一致
  fitOriginWidth: {
    type: Boolean,
    default: false,
  },
};

export type FlexibleOverlayProps = ExtractPropTypes<typeof flexibleOverlayProps>;
