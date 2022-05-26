import type { PropType, ExtractPropTypes, Ref } from 'vue';

export type TriggerType = 'click' | 'hover' | 'manually';
export type PopType = 'success' | 'error' | 'warning' | 'info' | 'default';
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

export const popoverProps = {
  isOpen: {
    type: Boolean,
    default: false,
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
    default: 8,
  },
  content: {
    type: String,
    default: '',
  },
  trigger: {
    type: String as PropType<TriggerType>,
    default: 'click',
  },
  popType: {
    type: String as PropType<PopType>,
    default: 'default',
  },
  showAnimation: {
    type: Boolean,
    default: true,
  },
  mouseEnterDelay: {
    type: Number,
    default: 150,
  },
  mouseLeaveDelay: {
    type: Number,
    default: 100,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
};

export type PopoverProps = ExtractPropTypes<typeof popoverProps>;

export interface UsePopoverEvent {
  placement: Ref<string>;
  handlePositionChange: (pos: string) => void;
  onMouseenter: () => void;
  onMouseleave: () => void;
}
