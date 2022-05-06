import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import DCheckboxGroup from '../../../checkbox/src/checkbox-group';
import DSearch from '../../../search/src/search';
import { TKey } from '../transfer-types';
import { transferBodyProps, TTransferBodyProps, transferBodyState } from '../composables/use-transfer-body';

export default defineComponent({
  name: 'DTransferBody',
  components: {
    DSearch,
    DCheckboxGroup
  },
  props: transferBodyProps,
  emits: ['change', 'update:modelValue'],
  setup(props: TTransferBodyProps, ctx: SetupContext) {
    const {
      bodyHeight,
      query,
      updateFilterQueryHandle
    } = transferBodyState(props, ctx);
    const renderSearch = () => {
      return <div class="devui-transfer-panel-body-search">
        <DSearch
          modelValue={query.value}
          placeholder={props.placeholder}
          is-keyup-search={props.isKeyupSearch}
          onSearch={(value: TKey) => {
            updateFilterQueryHandle(value);
          }}
        />
      </div>;
    };
    const renderList = () => {
      if (!props.data.length) {
        return <div class="devui-transfer-panel-body-list-empty">暂无数据</div>;
      }
      return <DCheckboxGroup
        modelValue={props.defaultChecked}
        options={props.data}
        onChange={(value) => {
          ctx.emit('change', value);
        }}
      />;
    };
    return () => {
      return ctx.slots.body && typeof ctx.slots.body === 'function' ? ctx.slots.body() : <div class="devui-transfer-panel-body">
        {props.isSearch && renderSearch()}
        <div class="devui-transfer-panel-body-list" style={{ height: bodyHeight.value }}>
          {
            renderList()
          }
        </div>
      </div>;
    };
  }
});
