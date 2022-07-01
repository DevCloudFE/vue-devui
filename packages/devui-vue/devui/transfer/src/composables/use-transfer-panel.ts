import { PropType, ExtractPropTypes, computed, ref, watch, watchEffect, RenderFunction, VNode } from 'vue';
import type { SetupContext } from 'vue';
import { IItem, TKey, filterValue } from '../transfer-types';

export const transferPanelProps = {
  title: {
    type: String,
    default: '',
  },
  height: {
    type: Number,
    default: 320,
  },
  data: {
    type: Array as PropType<IItem[]>,
    default: () => [],
  },
  defaultChecked: {
    type: Array as PropType<TKey[]>,
    default: () => [],
  },
  filter: {
    type: [Boolean, Function] as PropType<filterValue>,
    default: false,
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
  search: {
    type: Function as PropType<(direction: string, data: IItem[], keyword: TKey) => void>,
  },
  direction: {
    type: String,
    default: 'source',
  },
  isDrag: {
    type: Boolean,
    default: false,
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
  onUpdateAllChecked: {
    type: Function as PropType<(value: boolean) => void>,
  },
  onChangeChecked: {
    type: Function as PropType<([]: TKey) => void>,
  },
  renderContent: {
    type: Function as PropType<(h: RenderFunction, option: IItem) => VNode>,
  },
} as const;

export type TTransferPanelProps = ExtractPropTypes<typeof transferPanelProps>;

export const transferPanelState = (props: TTransferPanelProps, ctx: SetupContext) => {
  const allChecked = ref(false);
  const query = ref('');
  const bodyHeight = computed(() => `${props.height}px`);
  const filterData = computed(() => {
    return props.data.filter((item) => {
      if (typeof props.filter === 'function') {
        return props.filter(item, query.value);
      } else {
        return item.name.toLocaleUpperCase().includes(query.value.toLocaleUpperCase());
      }
    });
  });
  const checkableData = computed(() => {
    return filterData.value.filter((item) => {
      return !item.disabled;
    });
  });
  const allNum = computed(() => {
    return filterData.value.length;
  });
  const checkedNum = computed(() => {
    return filterData.value.length ? props.defaultChecked.length : filterData.value.length;
  });
  const allHalfchecked = computed(() => {
    if (allChecked.value) {
      return false;
    } else {
      return !!(filterData.value.length && props.defaultChecked.length > 0);
    }
  });

  /**
   * changeAllCheckedHandle: 穿梭框是否全选
   * @param value 是否全选
   */
  const changeAllCheckedHandle = (value: boolean): void => {
    const checkableDataValues = checkableData.value.map((item) => {
      return item.value;
    });
    const checkeds = value ? checkableDataValues : [];
    ctx.emit('updateAllChecked', checkeds);
  };
  /**
   * updateAllCheckedHandle: 更新全选
   * @param value 是否全选
   */
  const updateAllCheckedHandle = (): void => {
    const checkableDataValues = checkableData.value.map((item) => {
      return item.value;
    });
    allChecked.value =
      checkableDataValues.length > 0 &&
      checkableDataValues.every((item) => {
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
    props.search && typeof props.search === 'function' && props.search(props.direction, filterData.value, value);
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
    filterData,
    checkableData,
    allChecked,
    allHalfchecked,
    allNum,
    checkedNum,
    query,
    changeAllCheckedHandle,
    updateModelValueHandle,
    updateCheckedDataHandle,
    updateDataHandle,
  };
};
