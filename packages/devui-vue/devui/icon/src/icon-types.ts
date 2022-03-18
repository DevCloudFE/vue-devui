import { ExtractPropTypes } from 'vue';

export const iconProps = {
  name: {
    type: String,
    default: '',
    required: true,
  },
  size: {
    type: String,
    default: 'inherit',
  },
  color: {
    type: String,
    default: 'inherit',
  },
  classPrefix: {
    type: String,
    default: 'icon',
  },
};

export type IconProps = ExtractPropTypes<typeof iconProps>;
