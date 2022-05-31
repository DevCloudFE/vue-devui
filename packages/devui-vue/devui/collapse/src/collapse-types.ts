import { ExtractPropTypes, PropType } from 'vue';
export type ModelValue = number | string | Array<number | string>;
export const collapseProps = {
  modelValue: {
    type: [String, Number, Array] as PropType<ModelValue>,
    default: '',
  },
  'onUpdate:modelValue': {
    type: Function as PropType<(val: ModelValue) => void>,
    default: undefined,
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
  },
  title: {
    type: String,
    default: '',
  },
} as const;

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>;

export type CollapseContext = CollapseProps;
