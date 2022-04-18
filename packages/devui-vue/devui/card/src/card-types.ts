import { ExtractPropTypes, PropType } from 'vue';

export const cardProps = {
  align: {
    type: String as PropType<'start' | 'end' | 'spaceBetween'>,
    default: 'start'
  },
  src: {
    type: String,
    default: ''
  }
} as const;

export type CardProps = ExtractPropTypes<typeof cardProps>;
