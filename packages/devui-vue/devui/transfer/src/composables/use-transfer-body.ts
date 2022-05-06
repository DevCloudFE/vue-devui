import { PropType, ExtractPropTypes, computed, ref, watchEffect } from 'vue';
import type { SetupContext } from 'vue';
import { IItem, TKey } from '../transfer-types';

export const transferBodyProps = {
  height: {
    type: Number,
    default: 320
  },
  data: {
    type: Array as PropType<IItem[]>,
    default: () => []
  },
  defaultChecked: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  isSearch: {
    type: Boolean,
    default: false
  },
  queryString: {
    type: String,
    default: ''
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
    type: Function as PropType<(data: IItem[], keyword: TKey) => void>
  },
  onChange: {
    type: Function as PropType<(v: string[]) => void>,
    default: undefined
  },
  updateQueryString: {
    type: Function as PropType<(value: TKey) => void>,
    default: undefined
  }
} as const;

export type TTransferBodyProps = ExtractPropTypes<typeof transferBodyProps>;

export const transferBodyState = (props: TTransferBodyProps, ctx: SetupContext) => {
  const bodyHeight = computed(() => `${props.height}px`);
  const query = ref('');
  /**
   * updateFilterQueryHandle: 更新搜索框modelValue
   * @param value 搜索框值
  */
  const updateFilterQueryHandle = (value: TKey) => {
    ctx.emit('updateQueryString', value);
  };

  watchEffect(() => {
    query.value = props.queryString;
  });

  return {
    bodyHeight,
    query,
    updateFilterQueryHandle
  };
};


