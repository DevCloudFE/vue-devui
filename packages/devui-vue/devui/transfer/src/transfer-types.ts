import { PropType, ExtractPropTypes } from "vue";

export interface IItem {
  value: string;
  name: string;
  disabled: boolean;
}

export interface ICheckList {
  value: string;
  checked: boolean;
}

export interface IDargItemAndDropItem {
  startIndex: number;
  endIndex: number;
  dragItem: IItem;
  dropItem: IItem;
}

export type TKey = string;

export const transferProps = {
  sourceDefaultChecked: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  targetDefaultChecked: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  titles: {
    type: Array as PropType<string[]>,
    default: () => ['sourceHeader', 'targetHeader']
  },
  sourceOption: {
    type: Array as PropType<IItem[]>,
    default: () => []
  },
  targetOption: {
    type: Array as PropType<IItem[]>,
    default: () => []
  },
  isSearch: {
    type: Boolean,
    default: false
  },
  height: {
    type: Number,
    default: 320
  },
  unit: {
    type: String,
    default: '项'
  },
  placeholder: {
    type: String,
    default: '请输入关键词搜索'
  },
  isKeyupSearch: {
    type: Boolean,
    default: true
  },
  isSourceDrag: {
    type: Boolean,
    default: false
  },
  isTargetDrag: {
    type: Boolean,
    default: false
  },
  searching: {
    type: Function as PropType<(data: IItem[], keyword: TKey) => void>
  },
  sourceSortMethods: {
    type: Function as PropType<(data: IItem[]) => IItem[]>
  },
  targetSortMethods: {
    type: Function as PropType<(data: IItem[]) => IItem[]>
  },
  dragstart: {
    type: Function as PropType<(event: DragEvent, item: IItem) => void>
  },
  drop: {
    type: Function as PropType<(event: DragEvent, item: IItem) => void>
  },
  dragend: {
    type: Function as PropType<(event: DragEvent, item: IItem) => void>
  }
} as const;

export type TTransferProps = ExtractPropTypes<typeof transferProps>;

