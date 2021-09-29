import { ExtractPropTypes, PropType, CSSProperties } from 'vue';

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
    type: [String, Object] as PropType<string | CSSProperties>
  },
  hasBackdrop: {
    type: Boolean,
    default: false
  },
  backdropClick: {
    type: Function,
  },
  backdropClose: {
    type: Boolean,
    default: true
  }
} as const;


export type OverlayProps = ExtractPropTypes<typeof overlayProps>;