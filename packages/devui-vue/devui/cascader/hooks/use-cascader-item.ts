/**
 * 处理cascader-item中需要的参数
 */
import { cloneDeep } from 'lodash';
import { ref, reactive, Ref } from 'vue';
import { CascaderProps, UseCascaderItemCallback, CascaderItem } from '../src/cascader-types';

export const useCascaderItem = (props: CascaderProps, stopDefault?: Ref<boolean>, tagList?: CascaderItem[]): UseCascaderItemCallback => {
  /**
   * 传递给cascader-item/index.ts组件的数据
   */
  const cascaderItemNeedProps = {
    trigger: props.trigger,
    inputValueCache: ref(''),
    confirmInputValueFlg: ref(false), // 用于监听点击确定时输出选择内容
    valueCache: reactive(cloneDeep(props.modelValue)), // 操作时缓存选中的值
    value: reactive(cloneDeep(props.modelValue)), // 每级的value
    multiple: props.multiple,
    activeIndexs: reactive<number[]>([]), // 维护用于视图更新的选中下标
    tagList, // 多选模式下选中的值数组，用于生成tag
    stopDefault,
  };

  return {
    cascaderItemNeedProps,
    // getInputValue
  };
};
