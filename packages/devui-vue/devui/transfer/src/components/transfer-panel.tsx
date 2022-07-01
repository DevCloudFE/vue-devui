import { defineComponent, getCurrentInstance } from 'vue';
import type { SetupContext } from 'vue';
import { transferPanelProps, TTransferPanelProps, transferPanelState } from '../composables/use-transfer-panel';
import transferHeader from './transfer-header';
import transferBody from './transfer-body';
import { TKey } from '../transfer-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { createI18nTranslate } from '../../../locale/create';

export default defineComponent({
  name: 'DTransferPanel',
  components: {
    transferHeader,
    transferBody,
  },
  props: transferPanelProps,
  emits: ['updateAllChecked', 'changeButtonState', 'changeChecked'],
  setup(props: TTransferPanelProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DTransfer', app);

    const ns = useNamespace('transfer');
    const {
      allChecked,
      allHalfchecked,
      allNum,
      checkedNum,
      filterData,
      query,
      changeAllCheckedHandle,
      updateModelValueHandle,
      updateCheckedDataHandle,
      updateDataHandle,
    } = transferPanelState(props, ctx);
    return () => {
      return (
        <div class={ns.e('panel')}>
          <transferHeader
            title={props.title}
            checkedNum={checkedNum.value}
            unit={props.unit || t('panelUnit')}
            checked={allChecked.value}
            halfchecked={allHalfchecked.value}
            total={allNum.value}
            v-slots={{
              header: ctx.slots.header,
            }}
            search={props.search}
            onChange={(value: boolean): void => {
              changeAllCheckedHandle(value);
            }}></transferHeader>
          <transferBody
            height={props.height}
            filter={props.filter}
            isKeyupSearch={props.isKeyupSearch}
            isDrag={props.isDrag}
            placeholder={props.placeholder}
            defaultChecked={props.defaultChecked}
            search={props.search}
            dragstart={props.dragstart}
            drop={props.drop}
            dragend={props.dragend}
            data={filterData.value}
            queryString={query.value}
            renderContent={props.renderContent}
            onChange={(value: string[]) => {
              updateCheckedDataHandle(value);
            }}
            onUpdateQueryString={(value: TKey) => {
              updateModelValueHandle(value);
            }}
            onUpdateDataPosition={(startValue: TKey, endValue: TKey) => {
              updateDataHandle(startValue, endValue);
            }}></transferBody>
        </div>
      );
    };
  },
});
