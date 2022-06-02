import type { PropType, ExtractPropTypes } from 'vue';

export type TagType = 'primary' | 'success' | 'warning' | 'danger';
export type SizeType = 'lg' | 'md' | 'sm' | 'xs';

export const tagProps = {
  type: {
    type: String as PropType<TagType>,
    default: '',
  },
  color: {
    type: String as PropType<string>,
    default: '',
  },
  titleContent: {
    type: String as PropType<string>,
    default: '',
  },
  checked: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  deletable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  size: {
    type: String as PropType<SizeType>,
    default: 'xs',
  },
} as const;

export type TagProps = ExtractPropTypes<typeof tagProps>;
