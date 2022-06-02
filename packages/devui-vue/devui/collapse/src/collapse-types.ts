import { ExtractPropTypes, PropType } from 'vue';
export type CollapseActiveData = number | string | Array<number | string>;
export const collapseProps = {
  modelValue: {
    type: [String, Number, Array] as PropType<CollapseActiveData>,
    default: '',
    required: true,
  },
  accordion: {
    type: Boolean,
    default: false,
  },
} as const;

export type CollapseProps = ExtractPropTypes<typeof collapseProps>;

export const collapseItemProps = {
  name: {
    type: [String, Number] as PropType<string | number>,
    default: '',
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const;

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>;

export interface CollapseContext extends CollapseProps {
  collapseItemClick: (name: string | number) => void;
}
