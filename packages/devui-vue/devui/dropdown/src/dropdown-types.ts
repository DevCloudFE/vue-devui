import type { PropType, ExtractPropTypes, Ref } from 'vue';

export type TriggerType = 'click' | 'hover' | 'manually';
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

type ReadonlyRef<T> = Readonly<Ref<T>>;

export type EmitEvent = (event: 'toggle', result: boolean) => void;

export const dropdownProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  trigger: {
    type: String as PropType<TriggerType>,
    default: 'click',
  },
  closeScope: {
    type: String as PropType<CloseScopeArea>,
    default: 'all',
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
  closeOnMouseLeaveMenu: {
    type: Boolean,
    default: false,
  },
};

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>;

export interface UseDropdownProps {
  id: string;
  isOpen: Ref<boolean>;
  origin: ReadonlyRef<any>;
  dropdownRef: ReadonlyRef<any>;
  props: DropdownProps;
  emit: EmitEvent;
}
