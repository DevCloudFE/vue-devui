import { ExtractPropTypes, PropType, StyleValue, ComponentPublicInstance, Ref } from 'vue';

export const overlayProps = {
  visible: {
    type: Boolean,
  },
  'onUpdate:visible': {
    type: Function as PropType<(v: boolean) => void>
  },
  backgroundBlock: {
    type: Boolean,
    default: false
  },
  backgroundClass: {
    type: String,
    default: ''
  },
  backgroundStyle: {
    type: [String, Object] as PropType<StyleValue>
  },
  onBackdropClick: {
    type: Function,
  },
  backdropClose: {
    type: Boolean,
    default: true
  },
  hasBackdrop: {
    type: Boolean,
    default: true
  },
} as const;

export const overlayEmits = ['onUpdate:visible', 'backdropClick'] as ['onUpdate:visible', 'backdropClick'];
export type OverlayProps = ExtractPropTypes<typeof overlayProps>;


export const fixedOverlayProps = {
  ...overlayProps,
  overlayStyle: {
    type: [String, Object] as PropType<StyleValue>,
    default: undefined,
  },
};
export type FixedOverlayProps = ExtractPropTypes<typeof fixedOverlayProps>;


export const flexibleOverlayProps = {
  origin: {
    type: Object as PropType<OriginOrDomRef>,
    require: true,
  },
  position: {
    type: Object as PropType<ConnectionPosition>,
    default: (): ConnectionPosition => ({
      originX: 'left',
      originY: 'top',
      overlayX: 'left',
      overlayY: 'top',
    }),
  },
  ...overlayProps,
}




export interface ClientRect {
  bottom: number
  readonly height: number
  left: number
  right: number
  top: number
  readonly width: number
}

export interface Point {
  x: number
  y: number
}

export interface Rect {
  x: number
  y: number
  width?: number
  height?: number
}

export type Origin = Element | Rect;

type HorizontalConnectionPos = 'left' | 'center' | 'right';
type VerticalConnectionPos = 'top' | 'center' | 'bottom';

export interface ConnectionPosition {
  originX: HorizontalConnectionPos
  originY: VerticalConnectionPos
  overlayX: HorizontalConnectionPos
  overlayY: VerticalConnectionPos
}

export type OriginOrDomRef =
  | Element
  | ComponentPublicInstance
  | Ref<ComponentPublicInstance | Element | undefined | null>
  | Rect
  | null;

export type FlexibleOverlayProps = ExtractPropTypes<typeof flexibleOverlayProps>;


