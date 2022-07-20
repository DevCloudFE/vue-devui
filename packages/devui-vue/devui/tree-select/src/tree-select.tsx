import './tree-select.scss';

import { defineComponent, getCurrentInstance, toRefs, Transition } from 'vue';
import type { SetupContext } from 'vue';
import { treeSelectProps, TreeSelectProps, TreeItem } from './tree-select-types';
import { nodeMap, attributeExtension, className } from './utils';
import useToggle from '../hooks/use-toggle';
import useSelect from '../hooks/use-select';
import useClear from '../hooks/use-clear';
import IconOpen from '../assets/open';
import IconClose from '../assets/close';
import Checkbox from '../../checkbox/src/checkbox';
import ClickOutside from '../../shared/devui-directive/clickoutside';
import { createI18nTranslate } from '../../locale/create';

export default defineComponent({
  name: 'DTreeSelect',
  directives: { ClickOutside },
  props: treeSelectProps,
  emits: ['toggleChange', 'valueChange', 'update:modelValue'],
  setup(props: TreeSelectProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DTree', app);

    const { treeData, placeholder, disabled, multiple, leafOnly, enableLabelization } = toRefs(props);
    const { visible, selectToggle, treeToggle } = useToggle(props);
    const { inputValue, selectValue } = useSelect(props);
    const { isClearable, handleClearAll, handleClearItem } = useClear(props, ctx, inputValue);

    const clickNode = (item: TreeItem) => {
      if (!leafOnly.value) {
        selectValue(item);
        !multiple.value && selectToggle(item);
      } else {
        if (!item.children) {
          selectValue(item);
          !multiple.value && selectToggle(item);
        }
      }
    };

    const deleteNode = (e: MouseEvent, item: string) => {
      handleClearItem(e, item);
      selectValue(nodeMap.get(item));
    };

    const treeSelectCls = className('devui-tree-select', {
      'devui-tree-select-open': visible.value,
      'devui-tree-select-disabled': disabled.value,
    });

    const treeSelectInputItem = className('devui-tree-select-value', {
      'devui-tree-select-value-enableLabelization': enableLabelization.value,
    });

    const renderNode = (item) => (
      <div class="devui-tree-select-item" style={{ paddingLeft: `${20 * (item.level - 1)}px` }} onClick={() => clickNode(item)}>
        {item.children ? (
          item.opened ? (
            <IconOpen class="mr-xs" onClick={(e: MouseEvent) => treeToggle(e, item)} />
          ) : (
            <IconClose class="mr-xs" onClick={(e: MouseEvent) => treeToggle(e, item)} />
          )
        ) : (
          <span>{'\u00A0\u00A0\u00A0'}</span>
        )}
        {ctx.slots.default ? (
          ctx.slots.default({ item })
        ) : multiple.value ? (
          item.halfchecked ? (
            <Checkbox label={item.label} halfchecked={item.halfchecked} />
          ) : (
            <Checkbox label={item.label} checked={item.checked} />
          )
        ) : (
          item.label
        )}
      </div>
    );

    const renderTree = (treeData2) => {
      return treeData2.map((item) => {
        if (item.children) {
          return (
            <>
              {renderNode(item)}
              {item.opened && renderTree(item.children)}
            </>
          );
        }
        return renderNode(item);
      });
    };

    return () => {
      return (
        <div class={treeSelectCls} v-click-outside={() => (visible.value = false)}>
          <div class={isClearable.value ? 'devui-tree-select-clearable' : 'devui-tree-select-notclearable'} onClick={() => selectToggle()}>
            {/* <input
              value={inputValue.value}
              type="text"
              class="devui-tree-select-input"
              placeholder={placeholder}
              readonly
              disabled={disabled}
            /> */}
            <div class="devui-tree-select-input" placeholder={placeholder.value || t('selectPlaceholder')}>
              {multiple.value
                ? inputValue.value.map((item) => (
                  <div class={treeSelectInputItem}>
                    {item}
                    {enableLabelization.value ? <d-icon name="close" onClick={(e: MouseEvent) => deleteNode(e, item)} /> : <span>,</span>}
                  </div>
                ))
                : !Array.isArray(inputValue.value) && (
                  <div class={treeSelectInputItem}>
                    {inputValue.value}
                    {enableLabelization.value && <d-icon name="close" onClick={(e: MouseEvent) => handleClearItem(e)} />}
                  </div>
                )}
            </div>
            <span onClick={(e: MouseEvent) => handleClearAll(e)} class="devui-tree-select-clear">
              <d-icon name="close" />
            </span>
            <span class="devui-tree-select-arrow">
              <d-icon name="select-arrow" />
            </span>
          </div>
          <Transition name="fade" ref="dropdownRef">
            <div v-show={visible.value} class="devui-tree-select-dropdown">
              <ul class="devui-tree-select-dropdown-list">{renderTree(attributeExtension(treeData.value))}</ul>
            </div>
          </Transition>
        </div>
      );
    };
  },
});
