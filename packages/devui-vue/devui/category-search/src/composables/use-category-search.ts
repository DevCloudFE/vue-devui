import { ref, computed, toRefs, provide, watch, onMounted, reactive } from 'vue';
import type { Ref, SetupContext } from 'vue';
import { mergeWith, cloneDeep, merge } from 'lodash';
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
	const innerSelectedTags = ref<ICategorySearchTagItem[]>([]);
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
		numberRange: NumberRangeMenu
	};
	const operationConfig: ExtendConfig = reactive({
		clear: { show: true },
		save: { show: true },
		more: { show: true },
	});
	let scrollToTailFlag = true; // 是否在更新标签内容后滚动至输入框的开关
	let isSearchCategory = false;
	let categoryOrder: any[] = [];
	let categoryDictionary: Record<string, any> = {};
	let searchKeyCache = '';
	let blurTimer: any; // 失焦关闭下拉延时器，失焦后立刻展开下拉需清楚该延时

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

	function handleGroupLength(tag: ICategorySearchTagItem, isSelected: boolean, isInit = false) {
		if (categoryInGroup.value && tag.group) {
			const group = categoryDictionary[tag.group];
			const len = group.groupLength;
			group.groupLength = isSelected ? len - 1 : isInit ? len : len + 1;
			group.isSelected = group.groupLength === 0;
		}
	}
}