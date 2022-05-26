import { PropType, ExtractPropTypes, computed, ref, watch, watchEffect } from 'vue';
import type { SetupContext } from 'vue';
import { IItem, TKey } from '../transfer-types';

export const transferPanelProps = {
  title: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 320
  },
  data: {
    type: Array as PropType<IItem[]>,
    default: () => []
  },
  defaultChecked: {
    type: Array as PropType<TKey[]>,
    default: () => []
  },
  isSearch: {
    type: Boolean,
    default: false
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
  searching: {
    type: Function as PropType<(direction: TKey, data: IItem[], keyword: TKey) => void>
  },
  direction: {
    type: String,
    default: 'source'
  },
  isDrag: {
    type: Boolean,
    default: false
  },
  sortMethods: {
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
  },
  onUpdteAllChecked: {
    type: Function as PropType<(value: boolean) => void>
  },
  onChangeChecked: {
    type: Function as PropType<([]: TKey) => void>
  }
} as const;

export type TTransferPanelProps = ExtractPropTypes<typeof transferPanelProps>;


export const transferPanelState = (props: TTransferPanelProps, ctx: SetupContext) => {
  const allChecked = ref(false);
  const query = ref('');
  const bodyHeight = computed(() => `${props.height}px`);
  const fliterData = computed(() => {
    return props.data.filter(item => {
      return item.name.toLocaleUpperCase().includes(query.value.toLocaleUpperCase());
    });
  });
  const checkableData = computed(() => {
    return fliterData.value.filter(item => {
      return !item.disabled;
    });
  });
  const allNum = computed(() => {
    return fliterData.value.length;
  });
  const checkedNum = computed(() => {
    return fliterData.value.length ? props.defaultChecked.length : fliterData.value.length;
  });
  const allHalfchecked = computed(() => {
    if (allChecked.value) {
      return false;
    } else {
      return fliterData.value.length && props.defaultChecked.length > 0;
    }
  });

  /**
   * changeAllCheckedHandle: 穿梭框是否全选
   * @param value 是否全选
  */
  const changeAllCheckedHandle = (value: boolean): void => {
    const checkeds = value ? checkableData.value.map(item => item.value) : [];
    ctx.emit('updteAllChecked', checkeds);
  };
  /**
   * updateAllCheckedHandle: 更新全选
   * @param value 是否全选
  */
  const updateAllCheckedHandle = (): void => {
    const checkableDataValues = checkableData.value.map(item => {
      return item.value;
    });
    allChecked.value = checkableDataValues.length > 0 && checkableDataValues.every(item => {
      return props.defaultChecked.includes(item);
    });
  };
  /**
   * updateCheckedDataHandle: 更新穿梭框选中值
   * @param value 选中的值
  */
  const updateCheckedDataHandle = (value: TKey[]) => {
    ctx.emit('changeChecked', value);
  };
  /**
   * updateModelValueHandle: 更新搜索值
   * @param value 输入框值
  */
  const updateModelValueHandle = (value: TKey) => {
    query.value = value;
    props.searching && typeof props.searching === 'function' && props.searching(
      props.direction,
      fliterData.value,
      value
    );
  };
  /**
   * updateDataHandle: 更新数据
   * @param startValue 交换item的值
   * @param endValue 目标交换item的值
  */
  const updateDataHandle = (startValue: TKey, endValue: TKey) => {
    ctx.emit(`updateData`, startValue, endValue);
  };

  watchEffect(() => {
    updateAllCheckedHandle();
  });

  watch(
    () => props.defaultChecked,
    (nVal) => {
      updateAllCheckedHandle();
      ctx.emit('changeChecked', nVal);
    }
  );

  return {
    bodyHeight,
    fliterData,
    checkableData,
    allChecked,
    allHalfchecked,
    allNum,
    checkedNum,
    query,
    changeAllCheckedHandle,
    updateModelValueHandle,
    updateCheckedDataHandle,
    updateDataHandle
  };
};
