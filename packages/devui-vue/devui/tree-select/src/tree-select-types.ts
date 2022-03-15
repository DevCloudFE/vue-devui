import type { PropType, ExtractPropTypes } from 'vue';

export interface TreeItem {
  id: number | string;
  label: string;
  parent?: TreeItem;
  children?: Array<TreeItem>;
  level?: number;
  loading?: boolean;
  opened?: boolean;
  checked?: boolean;
  halfchecked?: boolean;
  disabled?: boolean;

  [prop: string]: any;
}

export type TreeData = Array<TreeItem>;

export type ModelValue = number | string | Array<number | string>;

export const treeSelectProps = {
  modelValue: {
    type: [String, Number, Array] as PropType<ModelValue>,
    default: '',
  },
  treeData: {
    type: Array as PropType<TreeData>,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  disabled: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  leafOnly: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  allowClear: {
    type: Boolean,
    default: false
  },
  enableLabelization: {
    type: Boolean,
    default: false
  },
  onToggleChange: {
    type: Function as PropType<(bool: boolean) => void>,
    default: undefined,
  },
  onValueChange: {
    type: Function as PropType<(item: TreeItem, index: number) => void>,
    default: undefined,
  },
} as const;

export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>;
