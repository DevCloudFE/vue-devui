import { ExtractPropTypes } from "vue";

export type menuMode = 'vertical' | 'horizontal';

export const menuProps = {
  width:{
    type: String,
    default: '',
  },
  collapsed: {
    type: Boolean,
    default: false
  },
  collapsedIndent: {
    type: Number,
    default: 24
  },
  indentSize: {
    type: Number,
    default: 24
  },
  multiple:{
    type: Boolean,
    default: false,
  },
  openKeys: {
    type: Array,
    default: []
  },
  defaultSelectKeys: {
    type: Array,
    default: [],
  },
  mode: {
    type: String as () => menuMode,
    default: 'vertical'
  }
} as const;

export type MenuProps = ExtractPropTypes<typeof menuProps>;
