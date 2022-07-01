import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import DCheckbox from '../../../checkbox/src/checkbox';
import { transferHeaderProps, TTransferHeaderProps, transferHeaderState } from '../composables/use-transfer-header';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'DTransferHeader',
  components: {
    DCheckbox,
  },
  props: transferHeaderProps,
  emits: ['change'],
  setup(props: TTransferHeaderProps, ctx: SetupContext) {
    const ns = useNamespace('transfer');
    const { allCheckedChangeHandle } = transferHeaderState(props, ctx);
    return () => {
      return ctx.slots.header && typeof ctx.slots.header === 'function' ? (
        ctx.slots.header()
      ) : (
        <div class={ns.em('panel', 'header')}>
          <div class={ns.em('panel', 'header-allChecked')}>
            <DCheckbox
              modelValue={props.checked}
              halfChecked={props.halfchecked}
              onChange={(value: boolean) => {
                allCheckedChangeHandle(value);
              }}>
              {props.title}
            </DCheckbox>
          </div>
          <div class={ns.em('panel', 'header-num')}>
            {props.checkedNum}/{props.total}
            <span class={ns.em('panel', 'header-num-unit')}>{props.unit}</span>
          </div>
        </div>
      );
    };
  },
});
