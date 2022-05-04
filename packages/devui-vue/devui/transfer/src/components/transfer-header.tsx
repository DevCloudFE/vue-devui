import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import DCheckbox from '../../../checkbox/src/checkbox';
import { transferHeaderProps, TTransferHeaderProps, transferHeaderState } from '../composables/use-transfer-header';

export default defineComponent({
  name: 'DTransferHeader',
  components: {
    DCheckbox
  },
  props: transferHeaderProps,
  emits: ['change'],
  setup(props: TTransferHeaderProps, ctx: SetupContext) {
    const { allCheckedChangeHandle } = transferHeaderState(props, ctx);
    return () => {
      return ctx.slots.header && typeof ctx.slots.header === 'function' ? ctx.slots.header()
        : <div class="devui-transfer-panel-header">
          <div class="devui-transfer-panel-header-allChecked">
            <DCheckbox
              modelValue={props.checked}
              halfchecked={props.halfchecked}
              onChange={(value: boolean) => {
                allCheckedChangeHandle(value);
              }}>
              {props.title}
            </DCheckbox>
          </div>
          <div class="devui-transfer-panel-header-num">{props.checkedNum}/{props.total}
            <span class="devui-transfer-panel-header-num-unit">{props.unit}</span>
          </div>
        </div>;
    };
  }
});
