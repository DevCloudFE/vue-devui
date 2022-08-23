import { ref, SetupContext, toRef, reactive, Ref, watch, onMounted } from 'vue';
import { cloneDeep } from 'lodash';
import { initActiveIndexs, initSingleIptValue } from './use-cascader-single';
import { initMultipleCascaderItem, initTagList, getMultiModelValues } from './use-cascader-multiple';
import type { CascaderItem, CascaderValueType, CascaderProps, UseCascaderFn } from '../src/cascader-types';
import { popupHandles } from './use-cascader-popup';
import { useCascaderItem } from './use-cascader-item';
import { useRootStyle } from './use-cascader-style';
import { useRootClassName } from './use-cascader-class';
import { useFilter } from './use-filter';

export const useCascader = (props: CascaderProps, ctx: SetupContext): UseCascaderFn => {
  const origin = ref<HTMLElement>();
  const overlayRef = ref<HTMLElement>();
  const cascaderOptions = reactive<[CascaderItem[]]>(cloneDeep([props?.options]));
  const multiple = toRef(props, 'multiple');
  const inputValue = ref('');
  const tagList = ref<CascaderItem[]>([]); // 多选模式下选中的值数组，用于生成tag
  const rootStyle = useRootStyle(props);
  const showClearable = ref(false);
  const position = ref(['bottom-start', 'top-start']);
  let initIptValue = props.modelValue.length > 0 ? true : false; // 有value默认值时，初始化输出内容

  // popup弹出层
  const { menuShow, menuOpenClass, openPopup, stopDefault, updateStopDefaultType } = popupHandles(props, overlayRef, origin);
  // 配置class
  const rootClasses = useRootClassName(props, menuShow);
  // 传递给cascaderItem的props
  const { cascaderItemNeedProps } = useCascaderItem(props, stopDefault, tagList.value);
  const getInputValue = (label: string, arr: CascaderItem[], inputValueCache?: Ref<string>, showPath?: boolean) => {
    if (inputValueCache !== undefined) {
      if (!showPath) {
        inputValueCache.value = label;
      } else {
        inputValueCache.value += label + (arr?.length > 0 ? ' / ' : '');
      }
    }
  };
  /**
   * 控制视图更新
   * 注意视图更新不区分单选或者多选
   * @param activeIndexs 视图展示下标集合
   * @param currentOption 选中的某项
   * @param index value的下标，起始为0
   */
  const updateCascaderView = (value: CascaderValueType, currentOption: CascaderItem[], index: number) => {
    if (index === value.length) {
      return;
    }
    const i = value[index] as number;
    // 当前的子级
    const current = currentOption[i];
    const children = current?.children || [];
    if (children?.length > 0) {
      // 为下一级增添数据
      cascaderOptions[index + 1] = children;
      // 递归添加
      updateCascaderView(value, children, index + 1);
    } else {
      // 当最新的ul(级)没有下一级时删除之前选中ul的数据
      cascaderOptions.splice(index + 1, cascaderOptions.length - 1);
    }
  };

  /**
   * 根据value筛选每列中选中item
   */
  const getCurrentOption = (currentOption: CascaderItem[], i: number) => {
    return currentOption.filter((item) => item?.value === i)[0];
  };

  /**
   * 选中项输出
   * 需要区分单选或多选模式
   * @param value 选中值集合
   * @param currentOption 激活的某项
   * @param index value的下标，起始为0
   */
  const updateCascaderValue = (value: CascaderValueType, currentOption: CascaderItem[], index: number) => {
    if (!multiple.value) {
      // 单选模式
      if (index === value.length) {
        return;
      }
      const i = value[index] as number;
      // 当前的子级
      const current = getCurrentOption(currentOption, i);
      const children: CascaderItem[] = current?.children || [];
      getInputValue(current.label, children, cascaderItemNeedProps.inputValueCache, props.showPath);
      if (children?.length > 0) {
        updateCascaderValue(value, children, index + 1);
      }
    } else {
      // 多选模式
      const rootColumn = cascaderOptions[0] || []; // 第一列
      value.forEach((targetValue) => {
        initMultipleCascaderItem(targetValue, rootColumn, tagList.value);
      });
    }
  };
  /**
   * 监听视图更新
   */
  watch(cascaderItemNeedProps.activeIndexs as CascaderValueType, (val) => {
    // TODO 多选模式下优化切换选择后的视图切换
    cascaderOptions.splice(val?.length || 0, cascaderOptions.length - 1);
    updateCascaderView(val, cascaderOptions[0], 0);
  });
  /**
   * 监听点击最终的节点输出内容
   */
  watch(
    () => cascaderItemNeedProps.confirmInputValueFlg?.value,
    () => {
      // 单选和多选模式初始化
      multiple.value ? initTagList(tagList.value) : initSingleIptValue(cascaderItemNeedProps.inputValueCache);
      // 输出确认的选中值
      cascaderItemNeedProps.value = reactive(cloneDeep(cascaderItemNeedProps.valueCache as CascaderValueType));
      menuShow.value = false;
      // 点击确定过后禁止再次选中
      updateStopDefaultType();
      // 更新值
      updateCascaderValue(cascaderItemNeedProps.value as CascaderValueType, cascaderOptions[0], 0);
      inputValue.value = cascaderItemNeedProps.inputValueCache?.value as string;
      // 单选模式默认回显视图的选中态
      // 多选模式不默认视图打开状态，因为选中了太多个，无法确定展示哪一种选中态
      if (initIptValue && !multiple.value) {
        initActiveIndexs(props.modelValue, cascaderOptions[0], 0, cascaderItemNeedProps.activeIndexs as number[]);
        initIptValue = false; // 只需要初始化一次，之后不再执行
      }
      ctx.emit('update:modelValue', cascaderItemNeedProps.value);
    },
    {
      immediate: true,
    }
  );
  watch(
    () => tagList,
    () => {
      if (multiple.value) {
        ctx.emit('update:modelValue', getMultiModelValues(tagList.value));
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );
  const showClear = () => {
    if (props.disabled) {
      return;
    }
    showClearable.value = true;
  };
  const hideClear = () => {
    showClearable.value = false;
  };
  const clearData = (e: MouseEvent) => {
    e.stopPropagation();
    menuShow.value = false;
    inputValue.value = '';
    ctx.emit('update:modelValue', []);
    menuShow.value = false;
    cascaderOptions.splice(1, cascaderOptions.length - 1);
    if (cascaderItemNeedProps.inputValueCache) {
      cascaderItemNeedProps.inputValueCache.value = '';
    }
    cascaderItemNeedProps.valueCache?.splice(0);
  };

  watch(
    () => props.modelValue,
    (newVal) => {
      ctx.emit('change', newVal);
    },
    { immediate: true, deep: true }
  );

  watch(
    () => props.options,
    () => {
      const len = cascaderOptions.length;
      cascaderOptions.splice(0, len, ...cloneDeep([props.options]));
    },
    { deep: true }
  );

  const onFocus = (e: FocusEvent) => {
    ctx.emit('focus', e);
  };
  const onBlur = (e: FocusEvent) => {
    ctx.emit('blur', e);
  };
  const { handleInput, suggestionsList, isSearching, chooseSuggestion } = useFilter(
    props,
    ctx,
    menuShow,
    cascaderItemNeedProps,
    updateCascaderView,
    inputValue,
    cascaderOptions
  );

  onMounted(() => {
    origin.value?.addEventListener('click', openPopup);
  });

  return {
    origin,
    overlayRef,
    menuShow,
    cascaderItemNeedProps,
    rootClasses,
    menuOpenClass,
    inputValue,
    openPopup,
    rootStyle,
    showClearable,
    position,
    cascaderOptions,
    tagList,
    showClear,
    hideClear,
    clearData,
    handleInput,
    multiple,
    suggestionsList,
    isSearching,
    chooseSuggestion,
    onFocus,
    onBlur,
  };
};
