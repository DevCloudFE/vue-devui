import { ExtractPropTypes, PropType, SetupContext } from 'vue';
import { IItem, ITitles, IModel, TState } from '../types';
import { transferCommon } from './use-transfer-common';

export const transferProps = {
  ...transferCommon,
  sourceOption: {
    type: Array as () => IItem[],
    require: true,
    default(): IItem[] {
      return [];
    }
  },
  targetOption: {
    type: Array as () => IItem[],
    require: true,
    default(): IItem[] {
      return [];
    }
  },
  titles: {
    type: Array as PropType<ITitles>,
    default: () => (): ITitles[] => ['Source', 'Target']
  },
  modelValue: {
    type: Array as PropType<string | number[]>,
    default: () => (): IModel[] => [],
  },
  height: {
    type: String,
    default: (): string => '320px'
  },
  isSearch: {
    type: Boolean,
    default: (): boolean => false
  },
  isSourceDroppable: {
    type: Boolean,
    default: (): boolean => false
  },
  isTargetDroppable: {
    type: Boolean,
    default: (): boolean => false
  },
  disabled: {
    type: Boolean,
    default: (): boolean => false
  },
  beforeTransfer: {
    type: Function as unknown as () => ((sourceOption: TState, targetOption: TState) => boolean | Promise<boolean>)
  },
  slots: {
    type: Object
  },
  searching: {
    type: Function as unknown as () => ((direction: string, keyword: string, targetOption: TState) => void)
  },
  transferToSource: {
    type: Function as unknown as () => ((sourceOption: TState, targetOption: TState) => void)
  },
  transferToTarget: {
    type: Function as unknown as () => ((sourceOption: TState, targetOption: TState) => void)
  },
  transferring: {
    type: Function as unknown as () => ((targetOption: TState) => void)
  },
  afterTransfer: {
    type: Function as unknown as () => ((targetOption: TState) => void)
  },
  onDragend: {
    type: Function as unknown as () => ((direction: string, dragItem: IItem, dropItem: IItem) => void)
  }
};

export type TransferProps = ExtractPropTypes<typeof transferProps>;

export const headerSlot = (ctx: SetupContext, name: string): unknown => {
  return !ctx.slots[`${name}-header`] ? null : () => ctx.slots[`${name}-header`] && ctx.slots[`${name}-header`]();
};

export const bodySlot = (ctx: SetupContext, name: string): unknown => {
  return !ctx.slots[`${name}-body`] ? null : () => ctx.slots[`${name}-body`] && ctx.slots[`${name}-body`]();
};

export const opeartionSlot = (ctx: SetupContext): unknown => {
  return ctx.slots && ctx.slots.operation && ctx.slots.operation() || null;
};


