import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { transferOperateProps, TTransferOperateProps, transferHeaderState } from '../composables/use-transfer-operate';
import DButton from '../../../button/src/button';

export default defineComponent({
  name: 'DTransferOperate',
  components: {
    DButton
  },
  props: transferOperateProps,
  setup(props: TTransferOperateProps, ctx: SetupContext) {
    const { toTargetHandle, toSourceHandle } = transferHeaderState(props, ctx);
    return () => {
      return <div class="devui-transfer-operate">
        {
          ctx.slots.operate && typeof ctx.slots.operate === 'function' ? ctx.slots.operate() :
            <div class="devui-transfer-operate-group">
              <DButton class="devui-transfer-operate-group-left icon-chevron-right"
                disabled={props.targetDisabled}
                onClick={() => toTargetHandle()}
              ></DButton>
              <DButton class="devui-transfer-operate-group-right icon-collapse"
                disabled={props.sourceDisabled}
                onClick={() => toSourceHandle()}
              ></DButton>
            </div>
        }
      </div>;
    };
  }
});
