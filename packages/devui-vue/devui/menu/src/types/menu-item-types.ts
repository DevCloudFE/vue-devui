import { ExtractPropTypes } from "vue";

export const menuItemProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
  href:{
    type: String,
    default: '',
  }
} as const;

export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>;
