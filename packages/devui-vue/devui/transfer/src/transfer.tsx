import { defineComponent, getCurrentInstance } from 'vue';
import type { SetupContext } from 'vue';
import transferPanel from './components/transfer-panel';
import transferOperate from './components/transfer-operate';
import { transferProps, TTransferProps, TKey, IItem } from './transfer-types';
import { transferState } from './composables/use-transfer';
import './transfer.scss';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { createI18nTranslate } from '../../locale/create';

export default defineComponent({
  name: 'DTransfer',
  components: {
    transferPanel,
    transferOperate,
  },
  props: transferProps,
  emits: ['update:modelValue', 'change'],
  setup(props: TTransferProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DTransfer', app);

    const ns = useNamespace('transfer');
    const {
      sourceTitle,
      targetTitle,
      sourceDisabled,
      targetDisabled,
      sourceData,
      targetData,
      sourceChecked,
      targetChecked,
      sourceDirection,
      targetDirection,
      updateSourceAllCheckedHandle,
      updateTargetAllCheckedHandle,
      updateSourceCheckedHandle,
      updateTargetCheckedHandle,
      toMoveTargetHandle,
      toMoveSourceHandle,
      updateSourceDataHandle,
      updateTargetDataHandle,
    } = transferState(props, ctx);
    return () => {
      return (
        <div class={ns.b()}>
          {ctx.slots.header && ctx.slots.header()}
          <transferPanel
            filter={props.filter}
            isKeyupSearch={props.isKeyupSearch}
            isDrag={props.isSourceDrag}
            height={props.height}
            unit={props.unit || t('unit')}
            placeholder={props.placeholder}
            sortMethods={props.sortMethods}
            search={props.search}
            dragstart={props.dragstart}
            drop={props.drop}
            dragend={props.dragend}
            title={sourceTitle.value}
            data={sourceData.value}
            defaultChecked={sourceChecked.value}
            direction={sourceDirection.value}
            renderContent={props.renderContent}
            class={ns.e('source')}
            v-slots={{
              header: ctx.slots.sourceHeader,
            }}
            onUpdateAllChecked={(value: IItem[]) => {
              updateSourceAllCheckedHandle(value);
            }}
            onChangeChecked={(value: IItem[]) => {
              updateSourceCheckedHandle(value);
            }}
            onUpdateData={(startValue: TKey, endValue: TKey) => {
              updateSourceDataHandle(startValue, endValue);
            }}></transferPanel>
          <transferOperate
            sourceDisabled={sourceDisabled.value}
            targetDisabled={targetDisabled.value}
            v-slots={{ ...ctx.slots }}
            onToTarget={() => {
              toMoveTargetHandle();
            }}
            onToSource={() => {
              toMoveSourceHandle();
            }}></transferOperate>
          <transferPanel
            filter={props.filter}
            isKeyupSearch={props.isKeyupSearch}
            isDrag={props.isTargetDrag}
            height={props.height}
            unit={props.unit || t('unit')}
            placeholder={props.placeholder}
            sortMethods={props.sortMethods}
            search={props.search}
            dragstart={props.dragstart}
            drop={props.drop}
            dragend={props.dragend}
            title={targetTitle.value}
            data={targetData.value}
            defaultChecked={targetChecked.value}
            direction={targetDirection.value}
            renderContent={props.renderContent}
            class={ns.e('target')}
            v-slots={{
              header: ctx.slots.targetHeader,
            }}
            onUpdateAllChecked={(value: IItem[]) => {
              updateTargetAllCheckedHandle(value);
            }}
            onChangeChecked={(value: IItem[]) => {
              updateTargetCheckedHandle(value);
            }}
            onUpdateData={(startValue: TKey, endValue: TKey) => {
              updateTargetDataHandle(startValue, endValue);
            }}></transferPanel>
        </div>
      );
    };
  },
});
