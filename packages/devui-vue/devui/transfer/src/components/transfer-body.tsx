import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import DCheckbox from '../../../checkbox/src/checkbox';
import DCheckboxGroup from '../../../checkbox/src/checkbox-group';
import DSearch from '../../../search/src/search';
import DIcon from '../../../icon/src/icon';
import { TKey } from '../transfer-types';
import { transferBodyProps, TTransferBodyProps, transferBodyState } from '../composables/use-transfer-body';

export default defineComponent({
  name: 'DTransferBody',
  components: {
    DSearch,
    DCheckbox,
    DCheckboxGroup,
    DIcon
  },
  props: transferBodyProps,
  emits: ['change', 'update:modelValue'],
  setup(props: TTransferBodyProps, ctx: SetupContext) {
    const {
      bodyHeight,
      query,
      checkedListModels,
      dragHighlight,
      dropPosition,
      dragOverNodeKey,
      updateFilterQueryHandle,
      updateCheckedListModels,
      setCurrentDragItem,
      setDragOverNodeKeyHandle,
      dragoverHandle,
      dragleaveHandle,
      dropHandle,
      dragendHandle,
      dragstartHandle
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
        class={'devui-transfer-panel-body-list-group'}
        onChange={(value) => {
          ctx.emit('change', value);
        }}
      />;
    };
    const renderDragList = () => {
      if (!props.data.length) {
        return <div class="devui-transfer-panel-body-list-empty">暂无数据</div>;
      }
      return props.data.map((item, idx) => {
        const isEqual = dragOverNodeKey.value === item.value;
        return <div
          class={{
            'devui-transfer-panel-body-list-item': true,
            'devui-transfer-panel-body-list-drag-dragging': dragHighlight.value === item.value,
            'devui-transfer-panel-body-list-drag-over': isEqual && dropPosition.value === 0,
            'devui-transfer-panel-body-list-drag-over-top': isEqual && dropPosition.value === -1,
            'devui-transfer-panel-body-list-drag-over-bottom': isEqual && dropPosition.value === 1,
          }}
          onDragstart={(event) => {
            dragstartHandle(event, item);
          }}
          onDragenter={event => {
            setDragOverNodeKeyHandle(event, item);
          }}
          onDragover={event => {
            dragoverHandle(event, item);
          }}
          onDragleave={event => {
            dragleaveHandle(event, item);
          }}
          onDrop={event => {
            dropHandle(event, item);
          }}
          onDragend={event => {
            dragendHandle(event, item);
          }}
          draggable={item.value === dragHighlight.value}
        >
          <span class="icon icon-drag-small"
            onMousedown={(event) => {
              setCurrentDragItem(event, item, true);
            }}
            onMouseout={(event) => {
              setCurrentDragItem(event, item, false);
            }}
          ></span>
          <DCheckbox
            label={item.name}
            key={item.value}
            modelValue={checkedListModels.value[idx].checked}
            onChange={(value) => {
              updateCheckedListModels(idx, value);
            }}
          />
        </div>;
      });
    };
    return () => {
      return ctx.slots.body && typeof ctx.slots.body === 'function' ? ctx.slots.body() : <div class="devui-transfer-panel-body">
        {props.isSearch && renderSearch()}
        <div class="devui-transfer-panel-body-list" style={{ height: bodyHeight.value }}>
          {
            props.isDrag ? renderDragList() : renderList()
          }
        </div>
      </div>;
    };
  }
});
