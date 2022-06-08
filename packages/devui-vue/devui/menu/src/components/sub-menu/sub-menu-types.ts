import { ExtractPropTypes } from 'vue';

export const subMenuProps = {
  title: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const;

export type SubMenuProps = ExtractPropTypes<typeof subMenuProps>;
