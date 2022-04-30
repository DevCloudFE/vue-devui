import type { PropType, ExtractPropTypes } from 'vue';

export type CloseScopeArea = 'all' | 'blank' | 'none';
export type Placement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';
export type Alignment = 'start' | 'end';
export type OffsetOptions = { mainAxis?: number; crossAxis?: number };

export const dropdownMenuProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  origin: {
    type: Object as PropType<HTMLElement>,
    require: true,
  },
  position: {
    type: Array as PropType<Array<Placement>>,
    default: ['bottom'],
  },
  align: {
    type: String as PropType<Alignment> | null,
    default: null,
  },
  offset: {
    type: [Number, Object] as PropType<number | OffsetOptions>,
    default: 4,
  },
  clickOutside: {
    type: Function as PropType<() => boolean>,
    default: (): boolean => true,
  },
  showAnimation: {
    type: Boolean,
    default: true,
  },
  overlayClass: {
    type: String,
    default: '',
  },
};

export type DropdownMenuProps = ExtractPropTypes<typeof dropdownMenuProps>;
