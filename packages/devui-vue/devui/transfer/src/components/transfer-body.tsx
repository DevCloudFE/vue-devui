import { defineComponent, getCurrentInstance, h } from 'vue';
import type { SetupContext } from 'vue';
import DCheckbox from '../../../checkbox/src/checkbox';
import DCheckboxGroup from '../../../checkbox/src/checkbox-group';
import DSearch from '../../../search/src/search';
import DIcon from '../../../icon/src/icon';
import { TKey } from '../transfer-types';
import { transferBodyProps, TTransferBodyProps, transferBodyState } from '../composables/use-transfer-body';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import '../transfer.scss';
import { createI18nTranslate } from '../../../locale/create';

export default defineComponent({
  name: 'DTransferBody',
  components: {
    DSearch,
    DCheckbox,
    DCheckboxGroup,
    DIcon,
  },
  props: transferBodyProps,
  emits: ['change', 'update:modelValue', 'updateQueryString', 'updateDataPosition'],
  setup(props: TTransferBodyProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DTransferBody', app);

    const ns = useNamespace('transfer');
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
      dragstartHandle,
    } = transferBodyState(props, ctx);
    const renderSearch = () => {
      return (
        <div class={ns.em('panel', 'body-search')}>
          <DSearch
            modelValue={query.value}
            placeholder={props.placeholder || t('placeholder')}
            is-keyup-search={props.isKeyupSearch}
            size="sm"
            onSearch={(value: TKey) => {
              updateFilterQueryHandle(value);
            }}
          />
        </div>
      );
    };
    const renderCheckboxInner = (data) => {
      if (props.renderContent) {
        return props.renderContent(h, data);
      } else {
        return data.name;
      }
    };
    const renderCheckbox = () => {
      return props.data.map((data) => {
        return (
          <DCheckbox disabled={data.disabled} value={data.value} class="transfer-checkbox">
            {renderCheckboxInner(data)}
          </DCheckbox>
        );
      });
    };
    const renderList = () => {
      if (!props.data.length) {
        return <div class={ns.em('panel', 'body-list-empty')}>{t('noData')}</div>;
      }
      return (
        <DCheckboxGroup
          modelValue={props.defaultChecked}
          class={ns.em('panel', 'body-list-group')}
          onChange={(value) => {
            ctx.emit('change', value);
          }}>
          {renderCheckbox()}
        </DCheckboxGroup>
      );
    };
    const renderDragList = () => {
      if (!props.data.length) {
        return <div class={ns.em('panel', 'body-list-empty')}>{t('noData')}</div>;
      }
      return props.data.map((item, idx) => {
        const isEqual = dragOverNodeKey.value === item.value;
        return (
          <div
            class={{
              [ns.em('panel', 'body-list-item')]: true,
              [ns.em('panel', 'body-list-drag-dragging')]: dragHighlight.value === item.value,
              [ns.em('panel', 'body-list-drag-over')]: isEqual && dropPosition.value === 0,
              [ns.em('panel', 'body-list-drag-over-top')]: isEqual && dropPosition.value === -1,
              [ns.em('panel', 'body-list-drag-over-bottom')]: isEqual && dropPosition.value === 1,
            }}
            onDragstart={(event) => {
              dragstartHandle(event, item);
            }}
            onDragenter={(event) => {
              setDragOverNodeKeyHandle(event, item);
            }}
            onDragover={(event) => {
              dragoverHandle(event, item);
            }}
            onDragleave={(event) => {
              dragleaveHandle(event, item);
            }}
            onDrop={(event) => {
              dropHandle(event, item);
            }}
            onDragend={(event) => {
              dragendHandle(event, item);
            }}
            draggable={item.value === dragHighlight.value}>
            <span
              class="icon icon-drag-small"
              onMousedown={(event) => {
                setCurrentDragItem(event, item, true);
              }}
              onMouseout={(event) => {
                setCurrentDragItem(event, item, false);
              }}></span>
            <DCheckbox
              label={item.name}
              key={item.value}
              disabled={item.disabled}
              modelValue={checkedListModels.value[idx] && checkedListModels.value[idx].checked}
              onChange={(value) => {
                updateCheckedListModels(idx, value);
              }}
            />
          </div>
        );
      });
    };
    return () => {
      return (
        <div class={ns.em('panel', 'body')}>
          {props.filter && renderSearch()}
          <div class={ns.em('panel', 'body-list')} style={{ height: bodyHeight.value }}>
            {props.isDrag ? renderDragList() : renderList()}
          </div>
        </div>
      );
    };
  },
});
