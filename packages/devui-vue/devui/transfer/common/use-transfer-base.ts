import { computed, ExtractPropTypes, PropType, ComputedRef } from 'vue';
import { IItem, TState, TResult } from '../types';
import { TransferProps } from './use-transfer';
import { transferCommon, transferDragFunctions } from './use-transfer-common';

export type TransferOperationProps = ExtractPropTypes<typeof transferBaseProps>;

export const transferBaseProps = {
  ...transferCommon,
  ...transferDragFunctions,
  sourceOption: {
    type: Array as () => IItem[],
    default(): Array<IItem> {
      return [];
    }
  },
  targetOption: {
    type: Array as () => IItem[],
    default(): Array<IItem> {
      return [];
    }
  },
  type: {
    type: String,
    default: (): string => 'source'
  },
  title: {
    type: String,
    default: (): string => 'Source'
  },
  search: {
    type: Boolean,
    default: (): boolean => false
  },
  allChecked: {
    type: Boolean,
    default: (): boolean => false
  },
  filter: {
    type: String,
    default: (): string => ''
  },
  height: {
    type: String,
    default: (): string => '320px'
  },
  alltargetState: {
    type: Boolean,
    default: (): boolean => false
  },
  checkedNum: {
    type: Number,
    default: (): number => 0
  },
  checkedValues: {
    type: Array,
    default: (): string[] => []
  },
  allCount: {
    type: Number,
    default: (): number => 0
  },
  isSourceDroppable: {
    type: Boolean,
    default: (): boolean => false
  },
  isTargetDroppable: {
    type: Boolean,
    default: (): boolean => false
  },
  scopedSlots: {
    type: Object
  },
  onChangeAllSource: {
    type: Function as unknown as () => ((val: boolean) => void)
  },
  onChangeQuery: {
    type: Function as PropType<(val: string) => void>
  },
  onUpdateCheckeds: {
    type: Function as PropType<(val: string[]) => void>
  },
  onDragend: {
    type: Function as unknown as () => ((dragItem: IItem, dropItem: IItem) => void)
  }
};

export type TransferBaseProps = ExtractPropTypes<typeof transferBaseProps>;

export const transferOperationProps = {
  sourceDisabled: {
    type: Boolean,
    default: (): boolean => true
  },
  targetDisabled: {
    type: Boolean,
    default: (): boolean => true
  },
  onUpdateSourceData: {
    type: Function as unknown as () => (() => void)
  },
  onUpdateTargetData: {
    type: Function as unknown as () => (() => void)
  }
};

const getFilterData = (props, type: string): TResult => {
  const newModel: string[] = [];
  const data: IItem[] = type === 'source' ? props.sourceOption : props.targetOption;
  const resultData: IItem[] = data.map((item: IItem) => {
    const checked = props.modelValue.some(cur => cur === item.value);
    checked && newModel.push(item.value);
    return item;
  });
  return {
    model: newModel,
    data: resultData
  };
};


export const initState = (props: TransferProps, type: string): TState => {
  const initModel: TResult = getFilterData(props, type);
  const state: TState = {
    data: initModel.data,
    allChecked: false,
    disabled: false,
    checkedNum: initModel.model.length,
    keyword: '',
    checkedValues: initModel.model,
    filterData: initModel.data
  };
  return state;
};

export const TransferBaseClass = (props: TransferOperationProps): ComputedRef => {
  return computed(() => {
    return `devui-transfer-panel devui-transfer-${props.type}`;
  });
};

export const Query = ((props: TransferOperationProps): ComputedRef => {
  return computed(() => props.filter);
});

