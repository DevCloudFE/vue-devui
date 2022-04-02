import { ExtractPropTypes } from "vue";

export interface IconPropsType {
  width: number;
  height: number;
}

export const avatarProps = {
  name: {
    type: String,
    default: null,
  },
  gender: {
    type: String as () => 'male' | 'female' | string,
    default: null,
  },
  width: {
    type: Number,
    default: 36,
  },
  height: {
    type: Number,
    default: 36,
  },
  isRound: {
    type: Boolean,
    default: true,
  },
  imgSrc: {
    type: String,
    default: '',
  },
  customText: {
    type: String,
    default: null,
  },
};

export type AvatarProps = ExtractPropTypes<typeof avatarProps>;
