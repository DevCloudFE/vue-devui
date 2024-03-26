import { ref, computed, toRefs, provide, watch, onMounted, reactive } from 'vue';
import type { Ref, SetupContext } from 'vue';
import { mergeWith, cloneDeep, merge } from 'lodash-es';
import RadioMenu from '../components/radio-menu';
import CheckboxMenu from '../components/checkbox-menu';
import LabelMenu from '../components/label-menu';
import TextInputMenu from '../components/text-input-menu';
import NumberRangeMenu from '../components/number-range-menu';
import { categorySearchInjectionKey } from '../category-search-types';
import type { ExtendConfig, CategorySearchProps, ICategorySearchTagItem, SearchConfig, ITagOption, TextConfig } from '../category-search-types';
import { DELAY, SearchKeyField, DROPDOWN_ANIMATION_TIMEOUT, getSearchMessage, getFindingMessage, COLORS } from '../category-search-const';

let ID_SEED = 0;

export function useCategorySearch(props: CategorySearchProps, ctx: SetupContext) {
	const {
		category,
		tagMaxWidth,
		textConfig,
		inputReadOnly,
		placeholder,
		searchKey,
		selectedTags,
		styleType,
		categoryInGroup,
		groupOrderConfig,
		defaultSearchField,
		beforeTagChange,
		toggleScrollToTail,
		showSearchCategory,
		filterNameRules,
		extendConfig,
	} = toRefs(props);
	const innerCategory: Ref<ICategorySearchTagItem[]> = ref([]);
	const innerSelectedTags: Ref<ICategorySearchTagItem[]> = ref([]);
	const innerTextConfig: Ref<TextConfig> = ref({});
	const id = ref(ID_SEED++);
	const isHover = ref(false);
	const isFocus = ref(false);
	const enterSearch = ref(false);
	const showNoDataTips = ref(false);
	const innerSearchKey = ref(searchKey.value);
	const scrollBarRef = ref<HTMLElement>();
	const rootRef = ref<HTMLElement>();
	const inputRef = ref();
	const showSearchConfig: Ref<SearchConfig> = ref({ keyword: true, field: true, category: true });
	const categoryDisplay: Ref<ICategorySearchTagItem[]> = ref([]);
	const searchField: Ref<ICategorySearchTagItem[]> = ref([]);
	const currentSearchCategory: Ref<ICategorySearchTagItem[]> = ref([]);
	const currentSelectTag: Ref<ICategorySearchTagItem | undefined> = ref();
	const joinLabelTypes = ['checkbox', 'label'];
	const valueIsArrayTypes = ['dateRange', 'numberRange', 'treeSelect', 'checkbox', 'label'];
	const ComponentMap: Record<string, any> = {
		radio: RadioMenu,
		checkbox: CheckboxMenu,
		label: LabelMenu,
		textInput: TextInputMenu,
		numberRange: NumberRangeMenu,
	};
	const operationConfig: ExtendConfig = reactive({
		clear: { show: true },
		save: { show: true },
		more: { show: false },
	});
	let scrollToTailFlag = true; // 是否在更新标签内容后滚动至输入框的开关
	let isSearchCategory = false;
	let categoryOrder: any[] = [];
	let categoryDictionary: Record<string, any> = {};
	let searchKeyCache = '';
	let blurTimer: any; // 失焦关闭下拉延时器，失焦后立刻展开下拉需清除该延时

	const containerClasses = computed(() => ({
		'dp-category-search-container': true,
		[`dp-category-search-id-${id.value}`]: true,
		'container-hover': isHover.value && !isFocus.value,
		'dp-gray-style': styleType.value === 'gray',
	}));

	const showExtendedConfig = computed(() => operationConfig.show ?? Boolean(innerSelectedTags.value.length || innerSearchKey.value));

	const removeTag = (tag: ICategorySearchTagItem, event?: Event) => {
		canChange(tag, 'delete').then((val) => {
			if (!val) {
				if (beforeTagChange?.value && event) {
					event.stopPropagation();
				}
				return;
			}
			tag = resetValue(tag);
			innerSelectedTags.value = innerSelectedTags.value.filter((item) => item.field !== tag.field);
			const result = getSelectedTagsExceptKeyword();
			if (tag.type === 'keyword') {
				innerSearchKey.value = innerSearchKey.value === searchKeyCache ? '' : innerSearchKey.value;
				searchKeyCache = '';
				enterSearch.value = innerSearchKey.value !== '';
				ctx.emit('search', { selectedTags: result, searchKey: innerSearchKey.value });
			} else {
				resolveCategoryDisplay(tag, 'add');
				ctx.emit('selectedTagsChange', { selectedTags: result, currentChangeTag: tag, operation: 'delete' });
			}
			currentSelectTag.value = undefined;
		});
	};

	const onSearch = () => {
		ctx.emit('search', { selectedTags: getSelectedTagsExceptKeyword(), searchKey: setSearchKeyTag() });
		isFocus.value = true;
	};

	// radio 单选 处理选中项方法
	const chooseItem = (tag: ICategorySearchTagItem, chooseItem: ITagOption) => {
		afterDropdownClosed();
		const key = tag.filterKey || 'label';
		tag.value = { value: chooseItem, cache: cloneDeep(chooseItem) };
		tag.value[key] = chooseItem[key];
		tag.title = setTitle(tag, 'radio');
		updateSelectedTags(tag);
	};

	// checkbox | label 多选 处理选中项方法
	const chooseItems = (tag: ICategorySearchTagItem) => {
		afterDropdownClosed();
		const key = tag.filterKey || 'label';
		if (tag.type === 'label') {
			tag.value!.value = tag.value!.value!.map((item) => {
				const res = item.split('_');
				return {
					$label: item,
					[tag.filterKey || 'label']: res[0],
					[tag.colorKey || 'color']: res[1],
				};
			});
		}
		const result = getItemValue(tag.value!.value, key);
		if (result) {
			tag.title = setTitle(tag, 'checkbox', result);
			tag.value![key] = result;
			tag.value!.cache = cloneDeep(tag.value!.value);
			updateSelectedTags(tag);
		} else {
			removeTag(tag);
		}
	};

	// textInput 文本输入框 处理选中项方法
	const getTextInputValue = (tag: ICategorySearchTagItem, inputValue: string) => {
		afterDropdownClosed();
		tag.value![tag.filterKey || 'label'] = tag.value!.cache = tag.value!.value = inputValue;
		tag.title = setTitle(tag, 'textInput');
		updateSelectedTags(tag);
	};

	// numberRange 数字范围 处理选中项方法
	const getNumberRangeValue = (tag: ICategorySearchTagItem, rangeValue: number[]) => {
		afterDropdownClosed();
		const startNum = rangeValue[0] || 0;
		const endNum = rangeValue[1] || 0;
		tag.value!.value = [startNum, endNum];
		tag.value!.cache = [startNum, endNum];
		tag.value![tag.filterKey || 'label'] = `${startNum} - ${endNum}`;
		tag.title = setTitle(tag, 'numberRange');
		updateSelectedTags(tag);
	};

	const onSearchKeyTagClick = () => {
		innerSearchKey.value = searchKeyCache;
		inputRef.value.focus();
		ctx.emit('searchKeyChange', innerSearchKey.value);
	};

	// 清空
	const clearFilter = (event: Event) => {
		if (innerSelectedTags.value.length) {
			innerSelectedTags.value.forEach((item) => resetValue(item));
			innerSelectedTags.value = [];
		}
		if (innerSearchKey.value || searchKeyCache) {
			innerSearchKey.value = '';
			searchKeyCache = '';
		}
		if (currentSelectTag.value) {
			currentSelectTag.value = undefined;
		}
		ctx.emit('selectedTagsChange', { selectedTags: [], currentChangeTag: undefined, operation: 'clear' });
		ctx.emit('clearAll', event);
		initCategoryDisplay();
	};

	// 保存
	const createFilterFn = (filterName: string) => {
		ctx.emit('createFilter', { name: filterName, selectedTags: getSelectedTagsExceptKeyword(), keyword: innerSearchKey.value });
	};

	const onCategoryItemClick = (item: ICategorySearchTagItem) => {
		updateSelectedTags(item, false);
		setTimeout(() => {
			currentSelectTag.value = item;
			if (currentSelectTag.value.type === 'label') {
				currentSelectTag.value = mergeToLabel(currentSelectTag.value);
			}
			currentSelectTag.value.title = setTitle(currentSelectTag.value, currentSelectTag.value.type || '', '');
			inputRef.value.openMenu();
			inputRef.value.focus();
		}, DROPDOWN_ANIMATION_TIMEOUT);
	};

	const searchKeyChangeEvent = (event: Event) => {
		innerSearchKey.value = (event.target as HTMLInputElement).value;
		enterSearch.value = Boolean(innerSearchKey.value);
		currentSearchCategory.value = innerSearchKey.value
			? innerCategory.value.filter((item) => item['label'].toLowerCase().includes(innerSearchKey.value.toLowerCase()))
			: [];
		ctx.emit('searchKeyChange', innerSearchKey.value);
	};

	const searchInputValue = (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		// 当有分类正在选择时输入关键字不处理
		if (!currentSelectTag.value) {
			ctx.emit('search', {
				selectedTags: getSelectedTagsExceptKeyword(),
				searchKey: setSearchKeyTag(),
			});
		}
	};

	const searchCategory = (item: ICategorySearchTagItem) => {
		if (valueIsArrayTypes.includes(item.type || '')) {
			return;
		}
		updateFieldValue(item, innerSearchKey.value);
		updateSelectedTags(item);
		innerSearchKey.value = '';
		enterSearch.value = false;
		finishChoose();
	};

	const showCurrentSearchCategory = (tag: ICategorySearchTagItem) => {
		isSearchCategory = true;
		innerSearchKey.value = '';
		inputRef.value.closeMenu();
		chooseCategory(tag);
		setTimeout(() => {
			isFocus.value = true;
			enterSearch.value = false;
		}, DELAY);
	};

	const onInputBackspace = () => {
		if (innerSearchKey.value) {
			return;
		}
		if (currentSelectTag.value) {
			currentSelectTag.value = undefined;
			inputRef.value.closeMenu();
			return;
		}
		if (innerSelectedTags.value.length) {
			const tag = innerSelectedTags.value[innerSelectedTags.value.length - 1];
			removeTag(tag);
		}
		inputRef.value.closeMenu();
	};

	const onInputToggle = () => {
		showNoDataTips.value = categoryDisplay.value.every((item) => item.isSelected);
	};

	watch(
		searchKey,
		() => {
			innerSearchKey.value = searchKey.value;
			searchKeyCache = searchKey.value;
			setSearchKeyTag(false);
		},
		{ immediate: true }
	);

	watch(
		[selectedTags, category, defaultSearchField],
		() => {
			innerSelectedTags.value = cloneDeep(selectedTags.value);
			innerCategory.value = cloneDeep(category.value);
			init();
		},
		{ immediate: true, deep: true }
	);

	watch(
		textConfig,
		() => {
			innerTextConfig.value = textConfig.value;
			innerTextConfig.value.createFilter = innerTextConfig.value.createFilter || '保存过滤器';
			innerTextConfig.value.filterTitle = innerTextConfig.value.filterTitle || '过滤器标题';
			showSearchConfig.value.keywordDescription = showSearchCategory.value.keywordDescription || getSearchMessage;
			showSearchConfig.value.fieldDescription = showSearchCategory.value.fieldDescription || getFindingMessage;
			showSearchConfig.value.categoryDescription = showSearchCategory.value.categoryDescription || '请选择筛选条件：';
			setTimeout(() => {
				const keyword = innerSelectedTags.value.find((item) => item.field === SearchKeyField);
				if (keyword) {
					keyword.label = innerTextConfig.value.keywordName || '关键字';
					keyword.title = `${keyword.label}:${keyword.value?.label}`;
				}
			});
		},
		{ immediate: true, deep: true }
	);

	watch(
		showSearchCategory,
		() => {
			const customConfig =
				typeof showSearchCategory.value === 'boolean'
					? {
						keyword: showSearchCategory.value,
						field: showSearchCategory.value,
						category: showSearchCategory.value,
					}
					: showSearchCategory.value;
			showSearchConfig.value = { ...showSearchConfig.value, ...customConfig };
		},
		{ immediate: true, deep: true }
	);

	watch(
		() => extendConfig?.value,
		() => {
			merge(operationConfig, extendConfig?.value || {});
		},
		{ immediate: true, deep: true }
	);

	ctx.expose({
		chooseItem,
		chooseItems,
		getTextInputValue,
		getNumberRangeValue,
		searchCategory,
	});

	onMounted(() => scrollToTail(true));

	provide(categorySearchInjectionKey, {
		rootRef,
		rootCtx: ctx,
		id,
		innerTextConfig,
		tagMaxWidth,
		inputReadOnly,
		placeholder,
		innerSearchKey,
		innerSelectedTags,
		isHover,
		isFocus,
		enterSearch,
		showSearchCategory,
		categoryDisplay,
		showSearchConfig,
		showNoDataTips,
		searchField,
		currentSearchCategory,
		ComponentMap,
		currentSelectTag,
		filterNameRules,
		joinLabelTypes,
		chooseItem,
		onSearchKeyTagClick,
		clearFilter,
		onCategoryItemClick,
		removeTag,
		chooseItems,
		getTextInputValue,
		getNumberRangeValue,
		createFilterFn,
		searchKeyChangeEvent,
		searchInputValue,
		searchCategory,
		showCurrentSearchCategory,
		onInputBackspace,
		onInputToggle,
	});

	function init() {
		setValue(innerCategory.value);
		setValue(innerSelectedTags.value, true);
		initCategoryDisplay(true);
		if (defaultSearchField.value.length && innerCategory.value.length) {
			searchField.value = innerCategory.value.filter(
				(item) => defaultSearchField.value.includes(item.field) && !valueIsArrayTypes.includes(item.type || '')
			);
		}
		// 初始化时判断已选中分类中最后一项是否赋值，未赋值则识别为正在处理的分类，优先显示赋值下拉列表
		if (innerSelectedTags.value.length) {
			const [lastItem] = innerSelectedTags.value.slice(-1);
			const isNull = lastItem.value?.[lastItem.filterKey || 'label'] === undefined;
			currentSelectTag.value =
				isNull && (lastItem.value?.value === undefined || (Array.isArray(lastItem.value.value) && lastItem.value.value.length === 0))
					? lastItem
					: undefined;
		}
		if (searchKeyCache) {
			innerSearchKey.value = searchKeyCache;
			setSearchKeyTag(false);
		}
	}

	function updateFieldValue(field: ICategorySearchTagItem, value: any) {
		const result: Record<string, any> = {};
		const filterKey = field.filterKey || 'label';
		const colorKey = field.colorKey || 'color';
		result[filterKey] = value;
		if (field.type === 'radio') {
			field.value!.value = { [filterKey]: value };
		}
		if (field.type === 'textInput') {
			field.value!.value = value;
		}
		if (field.type === 'label') {
			if (field.options![0] && !field.options![0].$label) {
				mergeToLabel(field);
			}
			result[colorKey] = COLORS[Math.floor(COLORS.length * Math.random())];
			result['$label'] = `${value}_${result[colorKey]}`;
		}
		if (joinLabelTypes.includes(field.type || '')) {
			field.value!.value = [result];
		}
		field.value![filterKey] = value;
		field.value!.cache = cloneDeep(field.value!.value);
		field.title = setTitle(field, field.type || '', value);
	}

	function chooseCategory(item: ICategorySearchTagItem) {
		// 点选分组名称不处理
		if (item.groupLength !== undefined) {
			return;
		}
		setTimeout(() => {
			currentSelectTag.value = item;
			if (currentSelectTag.value.type === 'label') {
				currentSelectTag.value = mergeToLabel(currentSelectTag.value);
			}
			currentSelectTag.value.title = setTitle(currentSelectTag.value, currentSelectTag.value.type || '', '');
			inputRef.value.openMenu();
		}, DROPDOWN_ANIMATION_TIMEOUT);
		updateSelectedTags(item, false);
	}

	function clearCurrentSelectTagFromSearch() {
		if (currentSelectTag.value) {
			if (isSearchCategory) {
				isSearchCategory = false;
				setTimeout(finishChoose, DELAY);
			}
		}
	}

	function finishChoose() {
		currentSelectTag.value = undefined;
		inputRef.value.focus();
	}

	function afterDropdownClosed() {
		setTimeout(() => {
			currentSelectTag.value = undefined;
		}, DROPDOWN_ANIMATION_TIMEOUT + 100);
	}

	function resolveCategoryDisplay(tag: ICategorySearchTagItem, type: string) {
		if (tag.field === SearchKeyField || !categoryDictionary[tag.field]) {
			return;
		}
		handleGroupLength(tag, type === 'delete');
		categoryDictionary[tag.field].isSelected = type === 'delete';
	}

	function resetValue(tag: ICategorySearchTagItem) {
		tag.value = valueIsArrayTypes.includes(tag.type || '') ? { value: [] } : { value: undefined };
		tag.value[tag.filterKey || 'label'] = undefined;
		return tag;
	}

	function getSelectedTagsExceptKeyword(): ICategorySearchTagItem[] {
		return showSearchConfig.value.keyword
			? innerSelectedTags.value.filter((item) => item.field !== SearchKeyField)
			: innerSelectedTags.value;
	}

	function canChange(tag: ICategorySearchTagItem, operation: 'delete' | 'add') {
		let changeResult = Promise.resolve(true);
		if (beforeTagChange?.value) {
			const result = beforeTagChange.value(tag, innerSearchKey.value, operation);
			if (typeof result !== 'undefined') {
				if (typeof result === 'boolean') {
					changeResult = Promise.resolve(result);
				} else {
					changeResult = result;
				}
			}
		}
		return changeResult;
	}

	function initCategoryDisplay(isInit = false) {
		const selectedTagsField = innerSelectedTags.value.map((item) => item.field);
		if (isInit) {
			innerCategory.value = cloneDeep(innerCategory.value) || [];
			categoryOrder = [];
			categoryDictionary = {};
			initGroupAndDictionary();
			initCategoryOrder();
		}
		categoryDisplay.value = categoryOrder.map((item) => {
			item.isSelected = selectedTagsField.includes(item.field);
			handleGroupLength(item, item.isSelected, isInit);
			return item;
		});
		showNoDataTips.value = categoryDisplay.value.every((item) => item.isSelected);
	}

	function handleGroupLength(tag: ICategorySearchTagItem, isSelected: boolean, isInit = false) {
		if (categoryInGroup.value && tag.group) {
			const group = categoryDictionary[tag.group];
			const len = group.groupLength;
			group.groupLength = isSelected ? len - 1 : isInit ? len : len + 1;
			group.isSelected = group.groupLength === 0;
		}
	}

	function initGroupAndDictionary() {
		innerCategory.value.forEach((item) => {
			if (categoryInGroup.value && item.group) {
				if (categoryDictionary[item.group]) {
					categoryDictionary[item.group].groupLength++;
				} else {
					categoryDictionary[item.group] = { groupName: item.group, groupLength: 1, children: [] };
				}
				categoryDictionary[item.group].children.push(item);
			}
			categoryDictionary[item.field] = item;
		});
	}

	function initCategoryOrder() {
		const keys = groupOrderConfig.value.length ? groupOrderConfig.value : Object.keys(categoryDictionary);
		keys.forEach((key) => {
			const item = categoryDictionary[key];
			if (item) {
				if (categoryInGroup.value) {
					if (item.groupName) {
						categoryOrder.push(item, ...item.children);
					} else if (!item.group) {
						categoryOrder.push(item);
					}
				} else {
					categoryOrder.push(item);
				}
			}
		});
	}

	function setSearchKeyTag(isSearch = true) {
		const result = innerSearchKey.value || searchKeyCache;
		if (showSearchConfig.value.keyword) {
			const existingSearchKeyTag = innerSelectedTags.value.find((tag) => tag.field === SearchKeyField);
			if (existingSearchKeyTag && !isSearch && innerSearchKey.value === '') {
				removeTag(existingSearchKeyTag);
			} else if (innerSearchKey.value && innerSearchKey.value !== existingSearchKeyTag?.value?.value) {
				createSearchKeyTag(isSearch);
			}
		}
		innerSearchKey.value = '';
		if (isSearch) {
			setTimeout(() => {
				enterSearch.value = false;
			}, DELAY);
		}
		return result;
	}

	function createSearchKeyTag(isSearch: boolean) {
		const label = innerTextConfig.value.keywordName || '关键字';
		const searchKeyTag: ICategorySearchTagItem = {
			options: [],
			field: SearchKeyField,
			label: label,
			type: 'keyword',
			title: `${label}:${innerSearchKey.value}`,
			value: {
				label: innerSearchKey.value,
				value: innerSearchKey.value,
				cache: innerSearchKey.value,
			},
		};
		updateSelectedTags(searchKeyTag, isSearch);
		searchKeyCache = innerSearchKey.value;
		innerSearchKey.value = '';
	}

	function updateSelectedTags(tag: ICategorySearchTagItem, valueChanged = true) {
		canChange(tag, 'add').then((val) => {
			if (!val) {
				return;
			}
			const index = innerSelectedTags.value.map((item) => item.field).indexOf(tag.field);
			if (index > -1) {
				if (!tag.value?.value) {
					// 通过输入选择分类时避免空值覆盖已选值
					merge(tag, innerSelectedTags.value[index]);
				}
				innerSelectedTags.value[index] = tag;
			} else {
				innerSelectedTags.value.push(tag);
			}
			if (valueChanged) {
				// 只在新增标签时位移滚动条
				if (scrollToTailFlag) {
					setTimeout(scrollToTail);
				}
				ctx.emit('selectedTagsChange', {
					selectedTags: getSelectedTagsExceptKeyword(),
					currentChangeTag: tag,
					operation: 'add',
				});
				isSearchCategory = false;
			} else {
				resolveCategoryDisplay(tag, 'delete');
			}
		});
	}

	// 判断滚动条是否存在，如果存在自动滚动到末尾的输入框
	function scrollToTail(isInit?: boolean) {
		const dom = scrollBarRef.value;
		if (toggleScrollToTail.value && dom && dom.scrollWidth > dom.clientWidth) {
			if (isInit) {
				dom.scrollLeft = dom.scrollWidth - dom.clientWidth;
			} else {
				inputRef.value.scrollIntoView();
			}
		} else if (!isInit) {
			// 初始化不聚焦，避免展开下拉
			inputRef.value.focus();
		}
	}

	function setValue(data: ICategorySearchTagItem[], isSelectedTags = false) {
		if (Array.isArray(data) && data.length) {
			data.forEach((item) => {
				if (isSelectedTags && innerCategory.value) {
					let result = '';
					const originItem = innerCategory.value.find((categoryItem) => categoryItem.field === item.field);
					mergeWith(item, originItem, mergeCheck);
					if (item.value?.value) {
						item.value.cache = cloneDeep(item.value.value);
						result = joinLabelTypes.includes(item.type || '') ? getItemValue(item.value.value, item.filterKey || 'label') : '';
					}
					item.title = setTitle(item, item.type || '', result);
					if (item.type === 'label' && item.options?.[0] && !item.options[0].$label) {
						mergeToLabel(item);
					}
				} else {
					item = initCategoryItem(item);
				}
			});
		}
	}

	function setTitle(tag: ICategorySearchTagItem, type: string, result?: string) {
		return joinLabelTypes.includes(type)
			? `${tag.label}: ${result || ''}`
			: `${tag.label}: ${result || (tag.value && tag.value[tag.filterKey || 'label']) || ''}`;
	}

	function mergeCheck(objValue: any, srcValue: any, key: string) {
		if (key === 'options' && objValue !== srcValue) {
			return srcValue;
		}
	}

	// checkbox | label 将选中项对应filterKey的值合并的方法，当前多选已通过data展示，可考虑移除
	function getItemValue(value: any, key: string) {
		if (value && Array.isArray(value)) {
			const result = value.map((item) => item[key]);
			return result.join(',');
		}
		return '';
	}

	// label 合并名称和颜色字段赋给tag，待[tag]支持传入对象后可移除
	function mergeToLabel(obj: ICategorySearchTagItem) {
		if (obj?.options && Array.isArray(obj.options)) {
			obj.options.forEach((item) => {
				item.$label = `${item[obj.filterKey || 'label']}_${item[obj.colorKey || 'color']}`;
			});
		}
		return obj;
	}

	// 初始化tag的value属性：{filterKey | label, value, data}
	function initCategoryItem(item: ICategorySearchTagItem) {
		const preValue: Record<string, any> = valueIsArrayTypes.includes(item.type || '') ? { value: [] } : { value: undefined };
		preValue[item.filterKey || 'label'] = undefined;
		if (item.value) {
			for (const prop in preValue) {
				if (item.value[prop] === undefined) {
					item.value[prop] = preValue[prop];
				}
			}
		} else {
			item.value = preValue;
		}
		item.value.cache = (item.value.value && typeof item.value.value === 'object' && cloneDeep(item.value.value)) || item.value.value;
		return item;
	}

	return {
		rootRef,
		scrollBarRef,
		inputRef,
		isHover,
		containerClasses,
		innerSelectedTags,
		joinLabelTypes,
		showExtendedConfig,
		operationConfig,
		removeTag,
		onSearch,
	};
}
