import type { ExtractPropTypes, PropType, StyleValue, Ref } from 'vue';

export const overlayProps = {
  visible: {
    type: Boolean,
  },
  backgroundBlock: {
    type: Boolean,
    default: false,
  },
  backgroundClass: {
    type: String,
    default: '',
  },
  backgroundStyle: {
    type: [String, Object] as PropType<StyleValue>,
  },
  onBackdropClick: {
    type: Function,
  },
  backdropClose: {
    type: Boolean,
    default: true,
  },
  hasBackdrop: {
    type: Boolean,
    default: true,
  },
} as const;

export const overlayEmits = ['update:visible', 'backdropClick'] as ['update:visible', 'backdropClick'];
export type OverlayProps = ExtractPropTypes<typeof overlayProps>;

export const fixedOverlayProps = {
  ...overlayProps,
  overlayStyle: {
    type: [String, Object] as PropType<StyleValue>,
    default: undefined,
  },
};
export type FixedOverlayProps = ExtractPropTypes<typeof fixedOverlayProps>;

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

export type Point = { x?: number; y?: number };

export type UseOverlayFn = { arrowRef: Ref<HTMLElement | undefined>; overlayRef: Ref<HTMLElement | undefined> };

export type EmitEventFn = (event: 'positionChange' | 'update:modelValue', result?: unknown) => void;

export type FlexibleOverlayProps = ExtractPropTypes<typeof flexibleOverlayProps>;
