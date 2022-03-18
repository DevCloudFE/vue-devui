import { ExtractPropTypes } from 'vue';

export type AlertType = 'success' | 'danger' | 'warning' | 'info' | 'simple';

export const alertProps = {
  type: {
    type: String as () => AlertType,
    default: 'info',
  },
  cssClass: {
    type: String,
    default: '',
  },
  closeable: {
    type: Boolean,
    default: true,
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  dismissTime: {
    type: Number,
    default: 0,
  },
} as const;

export type AlertProps = ExtractPropTypes<typeof alertProps>;
