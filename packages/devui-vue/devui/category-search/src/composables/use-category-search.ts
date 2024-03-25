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
	const operationConfig: ExtendConfig = {};
}