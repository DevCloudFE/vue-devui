import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { transferOpearateProps, TTransferOpearateProps, transferHeaderState } from '../composables/use-transfer-opearate';
import DButton from '../../../button/src/button';

export default defineComponent({
  name: 'DTransferOperate',
  components: {
    DButton
  },
  props: transferOpearateProps,
  setup(props: TTransferOpearateProps, ctx: SetupContext) {
    const { toTargetHandle, toSourceHandle } = transferHeaderState(props, ctx);
    return () => {
      return <div class="devui-transfer-operate">
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
      </div>;
    };
  }
});
