
import { ExtractPropTypes, PropType } from 'vue';
import type { SetupContext } from 'vue';

export const transferOpearateProps = {
  sourceDisabled: {
    type: Boolean,
    default: true
  },
  targetDisabled: {
    type: Boolean,
    default: true
  },
  onToTarget: {
    type: Function as PropType<() => void>
  },
  onToSource: {
    type: Function as PropType<() => void>
  }
} as const;

export type TTransferOpearateProps = ExtractPropTypes<typeof transferOpearateProps>;

export const transferHeaderState = (props: TTransferOpearateProps, ctx: SetupContext) => {
  /**
     * toTargetHandle: 源向目标穿梭
    */
  const toTargetHandle = () => {
    ctx.emit('toTarget');
  };
  /**
     * toSourceHandle: 目标向源穿梭
    */
  const toSourceHandle = () => {
    ctx.emit('toSource');
  };

  return {
    toTargetHandle,
    toSourceHandle
  };
};


