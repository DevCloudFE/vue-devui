import type { ExtractPropTypes, PropType, StyleValue } from 'vue';

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

export type OverlayProps = ExtractPropTypes<typeof overlayProps>;

export const fixedOverlayProps = {
  ...overlayProps,
  overlayStyle: {
    type: [String, Object] as PropType<StyleValue>,
    default: undefined,
  },
};

export type FixedOverlayProps = ExtractPropTypes<typeof fixedOverlayProps>;

export const overlayEmits = ['update:visible', 'backdropClick'] as ['update:visible', 'backdropClick'];

