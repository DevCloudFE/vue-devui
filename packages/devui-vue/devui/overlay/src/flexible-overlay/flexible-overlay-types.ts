import type { ExtractPropTypes, PropType, Ref,ComponentInternalInstance } from 'vue';

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
export type AppendToBodyScrollStrategy = 'close' | 'repostion'
export type PlaceStrategy = 'most-space' | 'no-space'
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
    type: Object as PropType<HTMLElement> | ComponentInternalInstance,
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
  appendToBodyScrollStrategy:{
    type:String as PropType<AppendToBodyScrollStrategy>,
    default:'reposition'
  },
  // 保持和宿主元素的宽度一致
  fitOriginWidth:{
    type: Boolean,
    default: false,
  },
  // 宽高变化时，是否自动调整位置
  autoUpdatePosition:{
    type: Boolean,
    default: false,
  },
  // 弹出层位置的放置策略
  placeStrategy:{
    type:String as PropType<PlaceStrategy>,
    default:'most-space'
  },
  scrollElement:{
    type:[Object,String] as PropType<HTMLElement | 'auto'> 
  }
};

export type FlexibleOverlayProps = ExtractPropTypes<typeof flexibleOverlayProps>;
