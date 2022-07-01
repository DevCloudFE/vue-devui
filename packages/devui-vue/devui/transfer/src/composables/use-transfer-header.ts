import { ExtractPropTypes, PropType } from 'vue';
import type { SetupContext } from 'vue';
import { IItem, TKey } from '../transfer-types';

export const transferHeaderProps = {
  title: {
    type: String,
    default: '',
  },
  checked: {
    type: Boolean,
    default: false,
  },
  halfchecked: {
    type: Boolean,
    default: false,
  },
  total: {
    type: Number,
    default: 0,
  },
  checkedNum: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    default: '',
  },
  onChange: {
    type: Function as PropType<(value: boolean) => void>,
  },
  search: {
    type: Function as PropType<(direction: string, data: IItem[], keyword: TKey) => void>,
  },
} as const;

export type TTransferHeaderProps = ExtractPropTypes<typeof transferHeaderProps>;

export const transferHeaderState = (props: TTransferHeaderProps, ctx: SetupContext) => {
  /**
   * allCheckedChangeHandle: 全选处理函数
   * @param value 是否全选
   */
  const allCheckedChangeHandle = (value: boolean) => {
    ctx.emit('change', value);
  };

  return {
    allCheckedChangeHandle,
  };
};
