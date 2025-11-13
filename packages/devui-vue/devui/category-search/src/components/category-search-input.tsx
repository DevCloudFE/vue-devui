import { defineComponent, inject, h } from 'vue';
import type { SetupContext } from 'vue';
import { Dropdown } from '../../../dropdown';
import { categorySearchInjectionKey } from '../category-search-types';
import type { CategorySearchInjection, ICategorySearchTagItem } from '../category-search-types';
import { useCategorySearchInput } from '../composables/use-category-search-input';

export default defineComponent({
	name: 'DCategorySearchInput',
	setup(_, ctx: SetupContext) {
		const {
			rootCtx,
			id,
			inputReadOnly,
			placeholder,
			innerSearchKey,
			isHover,
			isFocus,
			enterSearch,
			showNoDataTips,
			showSearchCategory,
			categoryDisplay,
			innerTextConfig,
			showSearchConfig,
			searchField,
			currentSearchCategory,
			ComponentMap,
			currentSelectTag,
			appendToBody,
			onCategoryItemClick,
			searchKeyChangeEvent,
			searchInputValue,
			searchCategory,
			showCurrentSearchCategory,
			onInputBackspace,
			onInputToggle
		} = inject(categorySearchInjectionKey) as CategorySearchInjection;
		const { isVisible, inputRef, onInputClick, onDropdownClose, closeMenu } = useCategorySearchInput(ctx);
		const checkType = (tag: ICategorySearchTagItem | undefined) => {
			return tag && tag.type === 'radio' ? 'all' : 'blank';
		};
		const onToggle = (status: boolean) => {
			isVisible.value = status;
			onInputToggle();
		};
		const onInputKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Backspace') {
				onInputBackspace();
			}
			if (e.key === 'Enter') {
				searchInputValue(e);
				closeMenu();
			}
		};
		const onKeydownDescriptionClick = (e: Event) => {
			searchInputValue(e);
			closeMenu();
		};
		const onFieldDescriptionClick = (item: ICategorySearchTagItem) => {
			searchCategory(item);
			closeMenu();
		};
		const onCategorySuggestionClick = (item: ICategorySearchTagItem) => {
			showCurrentSearchCategory(item);
			closeMenu();
		};

		return () => (
			<div class='dp-category-search-input'>
				<div class='dp-input-container'>
					<Dropdown
						visible={isVisible.value}
						class={[
							`dp-category-search-dropdown dp-dropdown-menu-fix dp-scrollbar dp-category-dropdown-menu-${id.value}`,
							{ 'max-height': currentSelectTag.value?.type !== 'treeSelect' },
						]}
						trigger='manually'
						align='start'
						position={['bottom-start', 'top-start', 'bottom-end', 'top-end']}
						close-scope={checkType(currentSelectTag.value)}
						append-to-body={appendToBody.value}
						onToggle={onToggle}>
						{{
							default: () => (
								<input
									ref={inputRef}
									class='dp-category-search-toggle'
									autocomplete='off'
									value={innerSearchKey.value}
									readonly={inputReadOnly.value}
									placeholder={placeholder.value || '点击此处添加筛选条件'}
									onInput={searchKeyChangeEvent}
									onClick={onInputClick}
									onKeydown={onInputKeydown}
									onFocus={() => {
										isHover.value = false;
										isFocus.value = true;
									}}
									onBlur={() => {
										isFocus.value = false;
									}}></input>
							),
							menu:
								!enterSearch.value || (enterSearch.value && showSearchCategory.value)
									? () => (
										<>
											{!currentSelectTag.value && (
												<ul class='dp-dropdown-menu-template'>
													{!enterSearch.value ? (
														<>
															{categoryDisplay.value.map((item) => (
																<>
																	{item.groupLength && (
																		<li class='dp-dropdown-item dp-category-search-group'>
																			{rootCtx.slots.groupName?.({ tag: item }) || <strong>{item.groupName}</strong>}
																		</li>
																	)}
																	{item.groupLength === undefined && !item.isSelected && (
																		<li class='dp-dropdown-item' onClick={() => onCategoryItemClick(item)}>
																			<span title={item.label}>{item.label}</span>
																		</li>
																	)}
																</>
															))}
															{showNoDataTips.value && (
																<div class='dp-no-data-text'>{innerTextConfig.value.noCategoriesAvailable || '没有筛选条件'}</div>
															)}
														</>
													) : (
														<>
															{showSearchConfig.value.keyword && (
																<li class='dp-dropdown-item dp-search-description' onClick={onKeydownDescriptionClick}>
																	<i class='icon-search'></i>
																	{showSearchConfig.value.keywordDescription?.(innerSearchKey.value)}
																</li>
															)}
															{showSearchConfig.value.field &&
																searchField.value.map((item) => (
																	<li class='dp-dropdown-item' onClick={() => onFieldDescriptionClick(item)}>
																		<i class='icon-search'></i>
																		{showSearchConfig.value.fieldDescription?.(item.label)}
																	</li>
																))}
															{(showSearchConfig.value.keyword || showSearchConfig.value.field) &&
																showSearchConfig.value.category &&
																Boolean(currentSearchCategory.value.length) && <div class='dp-dividing-line'></div>}
															{showSearchConfig.value.category && Boolean(currentSearchCategory.value.length) && (
																<>
																	<div
																		class='dp-dropdown-menu-tip'
																		style={{ paddingBottom: currentSearchCategory.value.length ? '0' : '12px' }}>
																		{showSearchConfig.value.categoryDescription}
																	</div>
																	<ul class='dp-category-search-keyword-in-category dp-dropdown-menu-template'>
																		{currentSearchCategory.value.map((item) => (
																			<li class='dp-dropdown-item' onClick={() => onCategorySuggestionClick(item)}>
																				<span>{item.label}</span>
																			</li>
																		))}
																	</ul>
																</>
															)}
														</>
													)}
												</ul>
											)}
											{!enterSearch.value &&
												currentSelectTag.value &&
												(rootCtx.slots[`${currentSelectTag.value.field}Menu`]?.({
													tagOption: currentSelectTag.value,
													close: onDropdownClose,
												}) ||
													h(ComponentMap[currentSelectTag.value.type!], { tag: currentSelectTag.value, onClose: onDropdownClose }))}
										</>
									)
									: null,
						}}
					</Dropdown>
				</div>
			</div>
		);
	},
});