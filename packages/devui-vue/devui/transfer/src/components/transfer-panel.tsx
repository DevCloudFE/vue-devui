import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { transferPanelProps, TTransferPanelProps, transferPanelState } from '../composables/use-transfer-panel';
import transferHeader from './transfer-header';
import transferBody from './transfer-body';
import { TKey } from '../transfer-types';

export default defineComponent({
  name: 'DTransferPanel',
  components: {
    transferHeader,
    transferBody
  },
  props: transferPanelProps,
  emits: ['updteAllChecked', 'changeButtonState', 'changeChecked'],
  setup(props: TTransferPanelProps, ctx: SetupContext) {
    const {
      allChecked,
      allHalfchecked,
      allNum,
      fliterData,
      query,
      changeAllCheckedHandle,
      updateModelValueHandle,
      updateCheckedDataHandle
    } = transferPanelState(props, ctx);
    return () => {
      return <div class="devui-transfer-panel">
        <transferHeader
          title={props.title}
          checkedNum={props.defaultChecked.length}
          unit={props.unit}
          checked={allChecked.value}
          halfchecked={allHalfchecked.value}
          total={allNum.value}
          onChange={(value: boolean): void => {
            changeAllCheckedHandle(value);
          }}
        >
        </transferHeader>
        <transferBody
        ></transferBody>
      </div>;
    };
  }
});
