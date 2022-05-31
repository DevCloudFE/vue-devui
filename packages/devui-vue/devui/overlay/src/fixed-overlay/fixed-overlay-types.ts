import type { ExtractPropTypes } from 'vue';

export const fixedOverlayProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
} as const;

export type FixedOverlayProps = ExtractPropTypes<typeof fixedOverlayProps>;

export interface UseFixedOverlay {
  onClick: (e: Event) => void;
}
