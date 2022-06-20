import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { transferOperateProps, TTransferOperateProps, transferHeaderState } from '../composables/use-transfer-operate';
import DButton from '../../../button/src/button';

export default defineComponent({
  name: 'DTransferOperate',
  components: {
    DButton,
  },
  props: transferOperateProps,
  setup(props: TTransferOperateProps, ctx: SetupContext) {
    const { toTargetHandle, toSourceHandle } = transferHeaderState(props, ctx);
    return () => {
      return (
        <div class="devui-transfer-operate">
          {ctx.slots.operate && typeof ctx.slots.operate === 'function' ? (
            ctx.slots.operate()
          ) : (
            <div class="devui-transfer-operate-group">
              <DButton
                class="devui-transfer-operate-group-left"
                shape="circle"
                size="lg"
                disabled={props.targetDisabled}
                icon="chevron-right"
                variant={!props.targetDisabled ? 'solid' : 'outline'}
                color={!props.targetDisabled ? 'primary' : 'secondary'}
                onClick={() => toTargetHandle()}></DButton>
              <DButton
                class="devui-transfer-operate-group-right"
                shape="circle"
                size="lg"
                disabled={props.sourceDisabled}
                icon="collapse"
                variant={!props.sourceDisabled ? 'solid' : 'outline'}
                color={!props.sourceDisabled ? 'primary' : 'secondary'}
                onClick={() => toSourceHandle()}></DButton>
            </div>
          )}
        </div>
      );
    };
  },
});
