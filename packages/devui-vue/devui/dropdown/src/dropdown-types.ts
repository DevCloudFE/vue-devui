import type { PropType, ExtractPropTypes, Ref, ComputedRef, TeleportProps } from 'vue';

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
export type OffsetOptions = { mainAxis?: number; crossAxis?: number };

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
    default: () => ['bottom', 'top', 'left', 'right'],
  },
  offset: {
    type: [Number, Object] as PropType<number | OffsetOptions>,
    default: 4,
  },
  shiftOffset: {
    type: Number,
  },
  closeOnMouseLeaveMenu: {
    type: Boolean,
    default: false,
  },
  showAnimation: {
    type: Boolean,
    default: true,
  },
  overlayClass: {
    type: String,
    default: '',
  },
  destroyOnHide: {
    type: Boolean,
    default: true,
  },
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body',
  },
};

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>;

export interface UseDropdownProps {
  id: string;
  isOpen: Ref<boolean>;
  origin: Ref<HTMLElement | undefined>;
  dropdownRef: Ref<HTMLElement | undefined>;
  props: DropdownProps;
  emit: EmitEvent;
}

export interface UseOverlayFn {
  overlayModelValue: Ref<boolean>;
  overlayShowValue: Ref<boolean>;
  styles: ComputedRef<Record<string, string>>;
  classes: ComputedRef<Record<string, boolean>>;
  handlePositionChange: (pos: string) => void;
}
