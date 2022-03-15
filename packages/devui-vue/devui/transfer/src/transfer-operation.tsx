import { defineComponent } from 'vue';
import DButton from '../../button/src/button';
import { transferOperationProps } from '../common/use-transfer-operation';

export default defineComponent({
  name: 'DTransferOperation',
  components: {
    DButton
  },
  props: transferOperationProps,
  setup(props, ctx) {
    return () => {
      return ctx.slots.operation && ctx.slots.operation() || <div class="devui-transfer-panel-operation">
        <div class="devui-transfer-panel-operation-group">
          <DButton
            class="devui-transfer-panel-operation-group-left"
            disabled={props.disabled ? props.disabled : props.sourceDisabled}
            onClick={() => ctx.emit('updateSourceData')}>
            <span class="icon-collapse"></span>
          </DButton>
          <DButton class="devui-transfer-panel-operation-group-right" disabled={props.disabled ? props.disabled : props.targetDisabled} onClick={() => ctx.emit('updateTargetData')}>
            <span class="icon-chevron-right"></span>
          </DButton>
        </div>
      </div>;
    };
  }
});
