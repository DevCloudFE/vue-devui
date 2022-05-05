import { defineComponent, inject } from 'vue';
import { DropdownProps, DropdownPropsKey, SourceItemObj } from '../auto-complete-types';
import dLoading from '../../../loading/src/loading-directive';
import { useNamespace } from '../../../shared/hooks/use-namespace';
export default defineComponent({
  name: 'DAutoCompleteDropdown',
  directives: { dLoading },
  setup(props, ctx) {
    const propsData = inject(DropdownPropsKey) as DropdownProps;
    const {
      visible,
      selectedIndex,
      selectOptionClick,
      searchList,
      searchStatus,
      dropDownRef,
      loadMore,
      showLoading,
      showNoResultItemTemplate,
      latestSource,
      modelValue,
      hoverIndex,
      valueParser,
    } = propsData;
    const { disabled, maxHeight, formatter, disabledKey, isSearching } = propsData.props;
    const ns = useNamespace('auto-complete');
    const noDataNs = useNamespace('no-data-tip');
    const dropdownMenuNs = useNamespace('dropdown-menu');
    const dropdownItemNs = useNamespace('dropdown-item');

    const onSelect = (item: string | SourceItemObj) => {
      item = valueParser.value(item);
      if (typeof item === 'object' && item[disabledKey]) {
        return;
      }
      selectOptionClick(item);
    };
    return () => {
      return (
        <div
          v-dLoading={showLoading.value}
          class={[
            dropdownMenuNs.b(),
            ns.e('dropdown-menu-cdk'),
            disabled && 'disabled',
            latestSource.value && ns.e('dropdown-latestSource'),
          ]}
          v-show={
            (visible.value && searchList.value.length > 0) ||
            (ctx.slots.noResultItemTemplate && showNoResultItemTemplate.value) ||
            (isSearching && ctx.slots.searchingTemplate && searchStatus?.value)
          }>
          <ul
            ref={dropDownRef}
            class={[ns.e('list-unstyled'), 'scroll-height']}
            style={{ maxHeight: `${maxHeight}px` }}
            onScroll={loadMore}>
            {/* 搜索中展示 */}
            {isSearching && ctx.slots.searchingTemplate && searchStatus?.value && (
              <li class={ns.e('searching-template')}>
                <div class={noDataNs.b()}>{ctx.slots.searchingTemplate()}</div>
              </li>
            )}
            {latestSource.value && !modelValue.value && <li class={ns.e('popup-tips')}>最近输入</li>}
            {/*  展示 */}
            {!showNoResultItemTemplate.value &&
              !searchStatus?.value &&
              searchList != null &&
              searchList.value.length > 0 &&
              searchList.value.map((item, index) => {
                return (
                  <li
                    onClick={() => onSelect(item)}
                    class={[
                      dropdownItemNs.b(),
                      selectedIndex.value === index && 'selected',
                      { disabled: disabledKey && typeof item === 'object' && item[disabledKey] },
                      { [ns.e('dropdown-bg')]: hoverIndex.value === index },
                    ]}
                    title={formatter(item)}
                    key={formatter(item)}>
                    {ctx.slots.itemTemplate ? ctx.slots.itemTemplate(item, index) : formatter(item)}
                  </li>
                );
              })}

            {/* 没有匹配结果传入了noResultItemTemplate*/}
            {!searchStatus?.value && searchList.value.length === 0 && ctx.slots.noResultItemTemplate && showNoResultItemTemplate.value && (
              <li class={ns.e('no-result-template')}>
                <div class={noDataNs.b()}>{ctx.slots.noResultItemTemplate()}</div>
              </li>
            )}
          </ul>
        </div>
      );
    };
  },
});
