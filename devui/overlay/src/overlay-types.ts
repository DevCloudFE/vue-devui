import { ExtractPropTypes, PropType } from 'vue';

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
  hasBackdrop: {
    type: Boolean,
    default: true
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