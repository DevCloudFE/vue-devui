import { defineComponent, inject, computed, withModifiers } from 'vue';
import type { SetupContext } from 'vue';
import AlertCloseIcon from '../../../alert/src/components/alert-close-icon';
import SelectArrowIcon from './select-arrow-icon';
import { Tag, SizeType } from '../../../tag';
import { Popover } from '../../../popover';
import { useNamespace } from '@devui/shared/utils';
import useSelectContent from '../composables/use-select-content';
import { OptionObjectItem } from '../select-types';
import { FORM_ITEM_TOKEN } from '../../../form';

export default defineComponent({
  name: 'SelectContent',
  setup(_, ctx: SetupContext) {
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
      singleInputRef,
      searchQuery,
      singleSearchKey,
      selectedData,
      isSelectDisable,
      isSupportCollapseTags,
      isDisabledTooltip,
      isReadOnly,
      isSupportFilter,
      selectionCls,
      inputCls,
      tagSize,
      placeholder,
      singlePlaceholder,
      singlePlaceholderWidth,
      isMultiple,
      isPlaceholderDark,
      displayInputValue,
      onSingleInputWrapClick,
      onMultipleClick,
      onArrowClick,
      handleClear,
      tagDelete,
      onFocus,
      onBlur,
      queryFilter,
    } = useSelectContent();

    const clearSingleSearchKey = () => {
      singleSearchKey.value = '';
    };

    const clearMultipleSearchKey = () => {
      searchQuery.value = '';
    };

    ctx.expose({
      clearSingleSearchKey,
      clearMultipleSearchKey,
    });

    return () => {
      return (
        <div class={selectionCls.value}>
          {isMultiple.value ? (
            <div class={multipleCls} onClick={onMultipleClick}>
              {!isSupportCollapseTags.value &&
                selectedData.value.length >= 1 &&
                selectedData.value.map((item: OptionObjectItem) => (
                  <Tag
                    deletable={!(isSelectDisable.value || item.disabled)}
                    onTagDelete={withModifiers(() => tagDelete(item), ['prevent', 'stop'])}
                    key={item.value}
                    maxWidth={'78%'}
                    class={['multiple-tag', { disabled: isSelectDisable.value || item.disabled }]}
                    size={tagSize.value as SizeType}>
                    {item.name}
                  </Tag>
                ))}
              {isSupportCollapseTags.value && selectedData.value.length >= 1 && (
                <Tag
                  deletable
                  maxWidth={'78%'}
                  class={'multiple-tag'}
                  onTagDelete={withModifiers(() => tagDelete(selectedData.value[0]), ['prevent', 'stop'])}
                  size={tagSize.value as SizeType}>
                  {selectedData.value[0].name}
                </Tag>
              )}
              {isSupportCollapseTags.value && selectedData.value.length > 1 && (
                <Popover
                  trigger="hover"
                  auto-update-position
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
                                class="popover-tag"
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
                  v-show={!selectedData.value.length || isSupportFilter.value}
                  ref="input"
                  value={searchQuery.value}
                  type="text"
                  class={inputCls.value}
                  placeholder={placeholder.value}
                  readonly={isReadOnly.value || !isSupportFilter.value}
                  disabled={isSelectDisable.value}
                  onInput={queryFilter}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
            </div>
          ) : (
            <div class="single-inner-input" onClick={onSingleInputWrapClick}>
              {!singleSearchKey.value && (
                <span
                  class={['input-placeholder', { 'placeholder-dark': isPlaceholderDark.value }]}
                  style={{ width: singlePlaceholderWidth.value }}
                  title={displayInputValue.value || singlePlaceholder.value}>
                  {displayInputValue.value || singlePlaceholder.value}
                </span>
              )}
              <input
                ref={singleInputRef}
                type="text"
                v-model={singleSearchKey.value}
                class={inputCls.value}
                readonly={isReadOnly.value}
                disabled={isSelectDisable.value}
                onFocus={onFocus}
                onBlur={onBlur}
                onInput={queryFilter}
              />
            </div>
          )}
          <span onClick={handleClear} class={clearCls.value}>
            <AlertCloseIcon />
          </span>
          <span class={arrowCls.value} onClick={onArrowClick}>
            <SelectArrowIcon />
          </span>
        </div>
      );
    };
  },
});
