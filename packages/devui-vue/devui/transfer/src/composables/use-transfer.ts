import { ref, computed, watchEffect } from 'vue';
import type { SetupContext } from 'vue';
import { TTransferProps, IItem, TKey } from '../transfer-types';

export const transferState = (props: TTransferProps, ctx: SetupContext) => {
  const sourceTitle = computed(() => props.titles[0]);
  const targetTitle = computed(() => props.titles[1]);
  const sourceChecked = ref<TKey[]>([]);
  const targetChecked = ref<TKey[]>([]);
  const sourceData = ref<IItem[]>([]);
  const targetData = ref<IItem[]>([]);
  const sourceDirection = ref('source');
  const targetDirection = ref('target');
  const sourceDefaultChecked = ref<TKey[]>([]);
  const targetDefaultChecked = ref<TKey[]>([]);
  const sourceDisabled = computed(() => {
    return targetChecked.value.length === 0;
  });
  const targetDisabled = computed(() => {
    return sourceChecked.value.length === 0;
  });


  /**
     * getTransferData: 处理穿梭框数据
    */
  const getTransferData = () => {
    return {
      sourceOption: (() => {
        if (props.sourceSortMethods && typeof props.sourceSortMethods === 'function') {
          return props.sourceSortMethods(props.sourceOption) ?? [];
        }
        return props.sourceOption;
      })(),
      targetOption: (() => {
        if (props.targetSortMethods && typeof props.targetSortMethods === 'function') {
          return props.targetSortMethods(props.targetOption) ?? [];
        }
        return props.targetOption;
      })()
    };
  };
  /**
     * updteSourceAllCheckedHandle: 更新源穿梭框全选
     * @param value 是否全选
    */
  const updteSourceAllCheckedHandle = (value: TKey[]) => {
    sourceChecked.value = value;
    sourceDefaultChecked.value = value;
  };
  /**
     * updteTargetAllCheckedHandle: 更新目标穿梭框全选
     * @param value 是否全选
    */
  const updteTargetAllCheckedHandle = (value: TKey[]) => {
    targetChecked.value = value;
    targetDefaultChecked.value = value;
  };
  /**
     * updateSourceCheckedHandle: 更新源选中值
     * @param value 是否可用
    */
  const updateSourceCheckedHandle = (value: TKey[]) => {
    sourceChecked.value = value;
    sourceDefaultChecked.value = value;
  };
  /**
     * updateTargetCheckedHandle: 更新目标选中值
     * @param value 是否可用
    */
  const updateTargetCheckedHandle = (value: TKey[]) => {
    targetChecked.value = value;
    targetDefaultChecked.value = value;
  };
  /**
     * toMoveTargetHandle: 源选中穿梭到目标
    */
  const toMoveTargetHandle = () => {
    const notIncluded: IItem[] = [];
    sourceData.value = sourceData.value.filter(item => {
      if (!sourceChecked.value.includes(item.value)) {
        return true;
      }
      notIncluded.push(item);
      return false;
    });
    sourceChecked.value = sourceDefaultChecked.value = [];
    targetData.value = targetData.value.concat(notIncluded);
  };
  /**
     * toMoveSourceHandle: 目标选中穿梭到源
    */
  const toMoveSourceHandle = () => {
    const notIncluded: IItem[] = [];
    targetData.value = targetData.value.filter(item => {
      if (!targetChecked.value.includes(item.value)) {
        return true;
      }
      notIncluded.push(item);
      return false;
    });
    targetChecked.value = targetDefaultChecked.value = [];
    sourceData.value = sourceData.value.concat(notIncluded);
  };


  watchEffect(() => {
    const { sourceOption, targetOption } = getTransferData();
    const sourceValues: TKey[] = [];
    const targetValues: TKey[] = [];
    sourceOption.map(item => {
      if (props.sourceDefaultChecked.includes(item.value) && item.disabled === false) {
        sourceValues.push(item.value);
      }
    });
    targetOption.map(item => {
      if (props.targetDefaultChecked.includes(item.value) && item.disabled === false) {
        targetValues.push(item.value);
      }
    });
    sourceData.value = sourceOption;
    targetData.value = targetOption;
    sourceDefaultChecked.value = sourceChecked.value = sourceValues;
    targetDefaultChecked.value = targetChecked.value = targetValues;
  });

  return {
    sourceTitle,
    targetTitle,
    sourceData,
    targetData,
    sourceDisabled,
    targetDisabled,
    sourceChecked,
    targetChecked,
    sourceDefaultChecked,
    targetDefaultChecked,
    sourceDirection,
    targetDirection,
    updteSourceAllCheckedHandle,
    updteTargetAllCheckedHandle,
    updateSourceCheckedHandle,
    updateTargetCheckedHandle,
    toMoveTargetHandle,
    toMoveSourceHandle
  };
};

