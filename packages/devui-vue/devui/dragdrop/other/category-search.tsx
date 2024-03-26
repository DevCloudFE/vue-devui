import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { SearchIcon } from './components/category-search-icons';
import CategorySearchTagDropdown from './components/category-search-tag-dropdown';
import CategorySearchInput from './components/category-search-input';
import CategorySearchClear from './components/category-search-clear';
import CategorySearchSave from './components/category-search-save';
import CategorySearchMore from './components/cate-gory-search-more';
import { categorySearchProps } from './category-search-types';
import type { CategorySearchProps } from './category-search-types';
import { useCategorySearch } from './composables/use-category-search';
import './category-search.scss';

export default defineComponent({
  name: 'DpCategorySearch',
  props: categorySearchProps,
  emits: ['search', 'selectedTagsChange', 'createFilter', 'clearAll', 'searchKeyChange'],
  setup(props: CategorySearchProps, ctx: SetupContext) {
    const {
      rootRef,
      scrollBarRef,
      inputRef,
      isHover,
      containerClasses,
      innerSelectedTags,
      joinLabelTypes,
      showExtendedConfig,
      operationConfig,
      onSearch,
    } = useCategorySearch(props, ctx);

    return () => (
      <div
        ref={rootRef}
        class={containerClasses.value}
        onMouseenter={() => (isHover.value = true)}
        onMouseleave={() => (isHover.value = false)}>
        <div class="dp-category-search-icon" onClick={onSearch}>
          <SearchIcon />
        </div>
        <div ref={scrollBarRef} class="dp-category-search-line-container">
          <ul class="dp-category-search-line">
            {innerSelectedTags.value.map((item) => (
              <CategorySearchTagDropdown item={item} isJoinLabelType={joinLabelTypes.includes(item.type || '')} />
            ))}
            <CategorySearchInput ref={inputRef} />
          </ul>
        </div>
        {showExtendedConfig.value && (
          <div class="dp-category-search-extended-container">
            {operationConfig.clear?.show && (
              <>{ctx.slots.clear?.() ?? <CategorySearchClear disabled={operationConfig.clear?.disabled} />}</>
            )}
            {operationConfig.save?.show && <>{ctx.slots.save?.() ?? <CategorySearchSave disabled={operationConfig.save?.disabled} />}</>}
            {operationConfig.more?.show && <>{ctx.slots.more?.() ?? <CategorySearchMore disabled={operationConfig.more?.disabled} />}</>}
            {ctx.slots.operation?.()}
          </div>
        )}
      </div>
    );
  },
});
