import type { ExtractPropTypes } from 'vue';

export const countdownProps = {
  value: {
    type: Number,
    required: true,
  },
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  prefix: {
    type: String,
    default: '',
  },
  suffix: {
    type: String,
    default: '',
  },
  valueStyle: {
    type: Object,
    default: () => {
      return {};
    },
  },
} as const;

export interface DateFormat {
  Y?: string | number;
  M?: string | number;
  D?: string | number;
  H?: string | number;
  m?: string | number;
  s?: string | number;
  S?: string | number;
}
export type CountdownProps = ExtractPropTypes<typeof countdownProps>;
