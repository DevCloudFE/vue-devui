import { cloneDeep } from 'lodash';
import { defineComponent, ref, Ref, reactive, watch, toRef, Transition } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import DCascaderList from '../components/cascader-list';
import DMultipleBox from '../components/cascader-multiple/index';
import { cascaderProps, CascaderItem, CascaderProps, CascaderValueType } from './cascader-types';
import { useCascaderItem } from '../hooks/use-cascader-item';
import { useRootClassName } from '../hooks/use-cascader-class';
import { useRootStyle } from '../hooks/use-cascader-style';
import { popupHandles } from '../hooks/use-cascader-popup';
import { initMultipleCascaderItem, initTagList, getMultiModelValues } from '../hooks/use-cascader-multiple';
import { initSingleIptValue, initActiveIndexs } from '../hooks/use-cascader-single';
import './cascader.scss';
export default defineComponent({
  name: 'DCascader',
  props: cascaderProps,
  emits: ['update:modelValue'],
  setup(props: CascaderProps, ctx) {
    const ns = useNamespace('cascader');
    const origin = ref<HTMLElement>();
    const overlay = ref<HTMLElement>();
    const cascaderOptions = reactive<[CascaderItem[]]>(cloneDeep([props?.options]));
    const multiple = toRef(props, 'multiple');
    const inputValue = ref('');
    const tagList = ref<CascaderItem[]>([]); // 多选模式下选中的值数组，用于生成tag
    const rootStyle = useRootStyle(props);
    const showClearable = ref(false);
    let initIptValue = props.modelValue.length > 0 ? true : false; // 有value默认值时，初始化输出内容

    // popup弹出层
    const { menuShow, menuOpenClass, openPopup, stopDefault, updateStopDefaultType, devuiCascader } = popupHandles(props);
    // 配置class
    const rootClasses = useRootClassName(props, menuShow);
    // 传递给cascaderItem的props
    const { cascaderItemNeedProps } = useCascaderItem(props, stopDefault, tagList.value);
    const getInputValue = (label: string, arr: CascaderItem[], inputValueCache: Ref<string>, showPath?: boolean) => {
      if (!showPath) {
        inputValueCache.value = label;
      } else {
        inputValueCache.value += label + (arr?.length > 0 ? ' / ' : '');
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
      const children = current?.children;
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
        const children = current?.children;
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
    watch(cascaderItemNeedProps.activeIndexs, (val) => {
      // TODO 多选模式下优化切换选择后的视图切换
      cascaderOptions.splice(val.length, cascaderOptions.length - 1);
      updateCascaderView(val, cascaderOptions[0], 0);
    });
    /**
     * 监听点击最终的节点输出内容
     */
    watch(
      () => cascaderItemNeedProps.confirmInputValueFlg.value,
      () => {
        // 单选和多选模式初始化
        multiple.value ? initTagList(tagList.value) : initSingleIptValue(cascaderItemNeedProps.inputValueCache);
        // 输出确认的选中值
        cascaderItemNeedProps.value = reactive(cloneDeep(cascaderItemNeedProps.valueCache));
        menuShow.value = false;
        // 点击确定过后禁止再次选中
        updateStopDefaultType();
        // 更新值
        updateCascaderValue(cascaderItemNeedProps.value, cascaderOptions[0], 0);
        inputValue.value = cascaderItemNeedProps.inputValueCache.value;
        // 单选模式默认回显视图的选中态
        // 多选模式不默认视图打开状态，因为选中了太多个，无法确定展示哪一种选中态
        if (initIptValue && !multiple.value) {
          initActiveIndexs(props.modelValue, cascaderOptions[0], 0, cascaderItemNeedProps.activeIndexs);
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
      ctx.emit('update:modelValue', []);
      cascaderItemNeedProps.valueCache = reactive([]);
    };

    return () => (
      <div ref={devuiCascader} style={rootStyle.inputWidth}>
        <div class={rootClasses.value} ref={origin} onClick={openPopup} {...ctx.attrs} onMouseenter={showClear} onMouseleave={hideClear}>
          {multiple.value ? (
            <DMultipleBox placeholder={props.placeholder} activeOptions={tagList.value}></DMultipleBox>
          ) : (
            <d-input disabled={props.disabled} placeholder={props.placeholder} modelValue={inputValue.value}></d-input>
          )}
          {!showClearable.value && (
            <div class={`${ns.e('icon')} ${ns.m('drop-icon-animation')}`}>
              <d-icon name="select-arrow" size="12px"></d-icon>
            </div>
          )}
          {showClearable.value && props.clearable && (
            <div class={`${ns.e('icon')} ${ns.e('close')}`} onClick={clearData}>
              <d-icon name="close" size="12px"></d-icon>
            </div>
          )}
        </div>
        <Transition name="fade">
          <d-flexible-overlay origin={origin.value} backgroundStyle={'background: transparent'} ref={overlay} v-model={menuShow.value}>
            <div class={ns.e('drop-menu-animation')}>
              <div class={`${menuOpenClass.value} ${ns.e('dropdown-menu')}`}>
                {cascaderOptions.map((item, index) => {
                  return (
                    <DCascaderList
                      cascaderItems={item}
                      ul-index={index}
                      cascaderItemNeedProps={cascaderItemNeedProps}
                      cascaderOptions={cascaderOptions}
                      {...props}></DCascaderList>
                  );
                })}
              </div>
            </div>
          </d-flexible-overlay>
        </Transition>
      </div>
    );
  },
});
