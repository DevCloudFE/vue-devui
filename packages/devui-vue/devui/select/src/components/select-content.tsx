import { defineComponent, inject, computed, withModifiers } from 'vue';
import AlertCloseIcon from '../../../alert/src/components/alert-close-icon';
import SelectArrowIcon from './select-arrow-icon';
import { Tag, SizeType } from '../../../tag';
import { Popover } from '../../../popover';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import useSelectContent from '../composables/use-select-content';
import { OptionObjectItem } from '../select-types';
import { FORM_ITEM_TOKEN } from '../../../form';

export default defineComponent({
  name: 'SelectContent',
  setup() {
    const formItemContext = inject(FORM_ITEM_TOKEN, undefined);
    const ns = useNamespace('select');
    const clearCls = computed(() => ({
      [ns.e('clear')]: true,
      [ns.em('clear', 'feedback')]: Boolean(formItemContext?.validateState) && formItemContext?.showFeedback,
    }));
    const arrowCls = computed(() => ({
      [ns.e('arrow')]: true,
      [ns.em('arrow', 'feedback')]: Boolean(formItemContext?.validateState) && formItemContext?.showFeedback,
    }));
    const multipleCls = ns.e('multiple');
    const multipleInputCls = ns.em('multiple', 'input');
    const {
      searchQuery,
      selectedData,
      isSelectDisable,
      isSupportCollapseTags,
      isDisabledTooltip,
      isReadOnly,
      selectionCls,
      inputCls,
      tagSize,
      placeholder,
      isMultiple,
      displayInputValue,
      handleClear,
      tagDelete,
      onFocus,
      onBlur,
      queryFilter,
    } = useSelectContent();

    return () => {
      return (
        <div class={selectionCls.value}>
          {isMultiple.value ? (
            <div class={multipleCls}>
              {!isSupportCollapseTags.value &&
                selectedData.value.length >= 1 &&
                selectedData.value.map((item: OptionObjectItem) => (
                  <Tag
                    deletable
                    onTagDelete={withModifiers(() => tagDelete(item), ['prevent', 'stop'])}
                    key={item.value}
                    size={tagSize.value as SizeType}>
                    {item.name}
                  </Tag>
                ))}
              {isSupportCollapseTags.value && selectedData.value.length >= 1 && (
                <Tag
                  deletable
                  onTagDelete={withModifiers(() => tagDelete(selectedData.value[0]), ['prevent', 'stop'])}
                  size={tagSize.value as SizeType}>
                  {selectedData.value[0].name}
                </Tag>
              )}
              {isSupportCollapseTags.value && selectedData.value.length > 1 && (
                <Popover
                  trigger="hover"
                  disabled={isDisabledTooltip.value}
                  v-slots={{
                    default: () => <Tag size={tagSize.value as SizeType}>{`+${selectedData.value.length - 1}`}</Tag>,
                    content: () => (
                      <div>
                        {selectedData.value.map(
                          (item: OptionObjectItem, index: number) =>
                            index !== 0 && (
                              <Tag
                                deletable
                                onTagDelete={withModifiers(() => tagDelete(item), ['prevent', 'stop'])}
                                key={item.value}
                                size={tagSize.value as SizeType}>
                                {item.name}
                              </Tag>
                            )
                        )}
                      </div>
                    ),
                  }}></Popover>
              )}
              <div class={multipleInputCls}>
                <input
                  ref="input"
                  value={searchQuery.value}
                  type="text"
                  class={inputCls.value}
                  placeholder={placeholder.value}
                  readonly={isReadOnly.value}
                  disabled={isSelectDisable.value}
                  onInput={queryFilter}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
            </div>
          ) : (
            <input
              ref="input"
              value={displayInputValue.value}
              type="text"
              class={inputCls.value}
              placeholder={placeholder.value}
              readonly={isReadOnly.value}
              disabled={isSelectDisable.value}
              onFocus={onFocus}
              onBlur={onBlur}
              onInput={queryFilter}
            />
          )}
          <span onClick={handleClear} class={clearCls.value}>
            <AlertCloseIcon />
          </span>
          <span class={arrowCls.value}>
            <SelectArrowIcon />
          </span>
        </div>
      );
    };
  },
});
