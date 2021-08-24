export const overlayProps = {
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
    default: false
  },
  backdropClick: {
    type: Function,
  },
  backdropClose: {
    type: Boolean,
    default: false
  }
} as const;
