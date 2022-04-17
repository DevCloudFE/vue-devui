import { PropType } from 'vue';
import { IItem } from '../types';

export const transferCommon = {
  showTooltip: {
    type: Boolean,
    default: (): boolean => false
  },
  tooltipPosition: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
    default: (): string => 'top'
  }
};

export const transferDragFunctions = {
  onDragstart: {
    type: Function as unknown as () => ((event: Event, dragItem: IItem) => void)
  },
  onDrop: {
    type: Function as unknown as () => ((event: Event, dropItem: IItem) => void)
  },
  onDragleave: {
    type: Function as unknown as () => ((event: Event, dragItem: IItem) => void)
  },
  onDragover: {
    type: Function as unknown as () => ((event: Event, dragItem: IItem) => void)
  },
  onDragenter: {
    type: Function as unknown as () => ((event: Event, dragItem: IItem) => void)
  },
  onDragend: {
    type: Function as unknown as () => ((event: Event, dropItem: IItem) => void)
  }
};
