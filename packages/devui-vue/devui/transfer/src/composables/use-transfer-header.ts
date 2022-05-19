
import { ExtractPropTypes, PropType } from 'vue';
import type { SetupContext } from 'vue';

export const transferHeaderProps = {
  title: {
    type: String,
    default: ''
  },
  checked: {
    type: Boolean,
    default: false
  },
  halfchecked: {
    type: Boolean,
    default: false
  },
  total: {
    type: Number,
    default: 0
  },
  checkedNum: {
    type: Number,
    default: 0
  },
  unit: {
    type: String,
    default: '项'
  },
  onChange: {
    type: Function as PropType<(value: boolean) => void>
  }
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
    allCheckedChangeHandle
  };
};


