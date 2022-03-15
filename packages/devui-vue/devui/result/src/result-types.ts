import type { ExtractPropTypes } from 'vue';

export type ResultIcon = 'success' | 'danger' | 'warning' | 'info';

export const resultProps = {
  icon: {
    type: String as () => ResultIcon,
    default: 'info'
  },
  title: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  }
} as const;

export type ResultProps = ExtractPropTypes<typeof resultProps>;
