import { ExtractPropTypes } from 'vue';
import { DEFAULT_PREFIX } from './const';

export const iconProps = {
  name: {
    type: String,
    default: '',
    required: true,
  },
  size: {
    type: [Number, String],
    default: 'inherit',
  },
  color: {
    type: String,
    default: 'inherit',
  },
  component: {
    type: Object,
    default: null,
  },
  classPrefix: {
    type: String,
    default: DEFAULT_PREFIX,
  },
  operable: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rotate: {
    type: [Number, String],
  },
};

export const svgIconProps = {
  name: {
    type: String,
    default: '',
    required: true,
  },
  color: {
    type: String,
    default: 'inherit',
  },
  size: {
    type: [Number, String],
    default: 'inherit',
  },
};

export type IconProps = ExtractPropTypes<typeof iconProps>;

export type SvgIconProps = ExtractPropTypes<typeof svgIconProps>;

export interface UseIconDom {
  iconDom: () => JSX.Element;
}
