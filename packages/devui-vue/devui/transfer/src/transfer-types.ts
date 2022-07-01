import { PropType, ExtractPropTypes, VNode, RenderFunction } from 'vue';

export interface IItem {
  value: string | number;
  name: string;
  disabled: boolean;
}

export interface ICheckList {
  value: string | number;
  checked: boolean;
  name: string;
}

export interface IDargItemAndDropItem {
  startIndex: number;
  endIndex: number;
  dragItem: IItem;
  dropItem: IItem;
}

export type TKey = string | number;

export type filterValue = boolean | ((data: IItem, key: string) => IItem[]);

export const transferProps = {
  modelValue: {
    type: Array as PropType<string | number[]>,
    default: () => [],
  },
  data: {
    type: Array as PropType<IItem[]>,
    default: () => [],
  },
  sourceDefaultChecked: {
    type: Array as PropType<string | number[]>,
    default: () => [],
  },
  targetDefaultChecked: {
    type: Array as PropType<string | number[]>,
    default: () => [],
  },
  titles: {
    type: Array as PropType<string[]>,
    default: () => ['sourceHeader', 'targetHeader'],
  },
  sourceOption: {
    type: Array as PropType<IItem[]>,
    default: () => [],
  },
  targetOption: {
    type: Array as PropType<IItem[]>,
    default: () => [],
  },
  filter: {
    type: [Boolean, Function] as PropType<filterValue>,
    default: false,
  },
  height: {
    type: Number,
    default: 320,
  },
  unit: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  isKeyupSearch: {
    type: Boolean,
    default: true,
  },
  isSourceDrag: {
    type: Boolean,
    default: false,
  },
  isTargetDrag: {
    type: Boolean,
    default: false,
  },
  search: {
    type: Function as PropType<(data: IItem[], keyword: TKey) => void>,
  },
  sortMethods: {
    type: Function as PropType<(data: IItem[]) => IItem[]>,
  },
  dragstart: {
    type: Function as PropType<(event: DragEvent, item: IItem) => void>,
  },
  drop: {
    type: Function as PropType<(event: DragEvent, item: IItem) => void>,
  },
  dragend: {
    type: Function as PropType<(event: DragEvent, item: IItem) => void>,
  },
  renderContent: {
    type: Function as PropType<(h: RenderFunction, option: IItem) => VNode>,
  },
} as const;

export type TTransferProps = ExtractPropTypes<typeof transferProps>;
