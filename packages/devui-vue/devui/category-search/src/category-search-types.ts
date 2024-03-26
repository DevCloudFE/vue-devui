import type { ExtractPropTypes, PropType, InjectionKey, SetupContext, Ref } from 'vue';

export type CategorySearchTagType = 'radio' | 'checkbox' | 'label' | 'textInput' | 'numberRange' | 'keyword';
export type StyleType = 'default' | 'gray';
export interface ITagOption {
	/**
	 * 选项，label和color默认都会取对应的 filterKey 和 colorKey，如未设置取默认值
	 */
	label?: string; // 通用默认属性，用于设置分类名称
	color?: string; // label 专用，用于设置标签颜色
	[propName: string]: any;
}
export interface ICategorySearchTagItem {
	/**
	 * 搜索字段，tag的键，用于区分不同的分类，需要唯一
	 */
	field: string;
	/**
	 * tag 键的显示值
	 */
	label: string;
	/**
	 * 配置项可生产的tag类型
	 */
	type?: CategorySearchTagType;
	/**
	 * 配置项所属的分组
	 */
	group?: string;
	/**
	 * tag 值的选择项数据
	 */
	options?: Array<ITagOption>;
	/**
	 * 用于显示的 tag 值的键值，如未设置默认取label
	 */
	filterKey?: string | 'label';
	/**
	 * 用于显示的label类型中色值的键值，如未设置默认取color
	 */
	colorKey?: string | 'color';
	/**
	 * 已选中值
	 */
	value?: {
		label?: string;
		value?: string | ITagOption | Array<ITagOption | number | string | Date>;
		cache?: string | ITagOption | Array<ITagOption | number | string | Date>;
		[propName: string]: any;
	};
	/**
	 * dateRange 类型是否显示时分秒
	 */
	showTime?: boolean;
	/**
	 * dateRange 类型默认激活开始或者结束日期
	 */
	activeRangeType?: 'start' | 'end';
	/**
	 * textInput 类型设置最大长度
	 */
	maxLength?: number;
	/**
	 * textInput | numberRange 类型设置占位符，numberRange需传入对象分别设置左右
	 */
	placeholder?: string | { left: string; right: string };
	/**
	 * textInput 表单校验规则
	 */
	validateRules?: any[];
	/**
	 * treeSelect 类型是否为多选，并显示已选择列表
	 */
	multiple?: boolean;
	/**
	 * treeSelect 类型是否显示搜索框
	 */
	searchable?: boolean;
	/**
	 * treeSelect 类型设置搜索框占位符
	 */
	searchPlaceholder?: string;
	/**
	 * treeSelect 类型自定义搜索方法，参数为搜索关键字和d-operable-tree组件实例
	 */
	searchFn?: (value: string, treeInstance: any) => boolean | Array<any>;
	/**
	 * treeSelect 类型相关配置，请参考treeSelect组件API中同名配置
	 */
	treeNodeIdKey?: string;
	treeNodeChildrenKey?: string;
	treeNodeTitleKey?: string;
	disabledKey?: string;
	leafOnly?: boolean;
	iconParentOpen?: string;
	iconParentClose?: string;
	iconLeaf?: string;
	[propName: string]: any;
}
export interface SearchConfig {
	keyword?: boolean;
	keywordDescription?: (searchKey: string) => string;
	field?: boolean;
	fieldDescription?: (label: string) => string;
	category?: boolean;
	categoryDescription?: string;
}
export interface TextConfig {
	keywordName?: string;
	createFilter?: string;
	filterTitle?: string;
	labelConnector?: string;
	noCategoriesAvailable?: string;
}
export interface ExtendConfig {
	show?: boolean;
	clear?: {
		show?: boolean;
		disabled?: boolean;
	};
	save?: {
		show?: boolean;
		disabled?: boolean;
	};
	more?: {
		show?: boolean;
		disabled?: boolean;
	};
}

export const categorySearchProps = {
	category: {
		type: Array as PropType<ICategorySearchTagItem[]>,
		default: () => []
	},
	defaultSearchField: {
		type: Array as PropType<String[]>,
		default: () => []
	},
	selectedTags: {
		type: Array as PropType<ICategorySearchTagItem[]>,
		default: () => []
	},
	toggleScrollToTail: {
		type: Boolean,
		default: false,
	},
	searchKey: {
		type: String,
		default: ''
	},
	placeholder: {
		type: String,
		default: ''
	},
	inputReadOnly: {
		type: Boolean,
		default: false
	},
	tagMaxWidth: {
		type: Number,
	},
	beforeTagChange: {
		type: Function as PropType<(tag: ICategorySearchTagItem, searchKey: string, operation: string) => boolean | Promise<boolean>>,
	},
	showSearchCategory: {
		type: [Boolean, Object] as PropType<boolean | SearchConfig>,
		default: true,
	},
	categoryInGroup: {
		type: Boolean,
		default: false,
	},
	groupOrderConfig: {
		type: Array as PropType<string[]>,
		default: () => []
	},
	filterNameRules: {
		type: Array as PropType<Record<string, any>[]>,
	},
	textConfig: {
		type: Object as PropType<TextConfig>,
		default: () => ({
			keywordName: '',
			createFilter: '',
			filterTitle: '',
			labelConnector: '|',
			noCategoriesAvailable: ''
		}),
	},
	extendConfig: {
		type: Object as PropType<ExtendConfig>,
	},
	styleType: {
		type: String as PropType<StyleType>,
		default: 'default'
	}
};
export type CategorySearchProps = ExtractPropTypes<typeof categorySearchProps>;

export interface CategorySearchInjection {
	rootCtx: SetupContext;
	rootRef: Ref<HTMLElement | undefined>;
	id: Ref<number>;
	innerTextConfig: Ref<TextConfig>;
	tagMaxWidth: Ref<number | undefined> | undefined;
	inputReadOnly: Ref<boolean>;
	placeholder: Ref<string>;
	innerSearchKey: Ref<string>;
	innerSelectedTags: Ref<ICategorySearchTagItem[]>;
	isHover: Ref<boolean>;
	isFocus: Ref<boolean>;
	enterSearch: Ref<boolean>;
	showNoDataTips: Ref<boolean>;
	showSearchCategory: Ref<boolean | SearchConfig>;
	showSearchConfig: Ref<SearchConfig>;
	categoryDisplay: Ref<ICategorySearchTagItem[]>;
	searchField: Ref<ICategorySearchTagItem[]>;
	currentSearchCategory: Ref<ICategorySearchTagItem[]>;
	ComponentMap: Record<string, any>;
	currentSelectTag: Ref<ICategorySearchTagItem | undefined>;
	filterNameRules: Ref<Record<string, any>[] | undefined> | undefined;
	joinLabelTypes: string[];
	chooseItem: (tag: ICategorySearchTagItem, chooseItem: ITagOption) => void;
	onSearchKeyTagClick: () => void;
	clearFilter: (e: Event) => void;
	onCategoryItemClick: (item: ICategorySearchTagItem) => void;
	removeTag: (tag: ICategorySearchTagItem, event?: Event) => void;
	chooseItems: (tag: ICategorySearchTagItem) => void;
	getTextInputValue: (tag: ICategorySearchTagItem, inputValue: string) => void;
	getNumberRangeValue: (tag: ICategorySearchTagItem, rangeValue: number[]) => void;
	createFilterFn: (filterName: string) => void;
	searchKeyChangeEvent: (e: Event) => void;
	searchInputValue: (event: Event) => void;
	searchCategory: (item: ICategorySearchTagItem) => void;
	showCurrentSearchCategory: (tag: ICategorySearchTagItem) => void;
	onInputBackspace: () => void;
	onInputToggle: () => void;
}
export const categorySearchInjectionKey: InjectionKey<CategorySearchInjection> = Symbol('d-category-search');

export const categorySearchDropdownProps = {
	item: {
		type: Object as PropType<ICategorySearchTagItem>,
		default: () => ({})
	},
	isJoinLabelType: {
		type: Boolean,
		default: false
	},
};
export type CategorySearchDropdownProps = ExtractPropTypes<typeof categorySearchDropdownProps>;

export const categorySearchTagProps = {
	item: {
		type: Object as PropType<ICategorySearchTagItem>,
		default: () => ({})
	},
	isJoinLabelType: {
		type: Boolean,
		default: false
	},
};
export type CategorySearchTagProps = ExtractPropTypes<typeof categorySearchTagProps>;

// radio | checkbox | label | textInput 类型，弹出层组件接收的参数
export const typeMenuProps = {
	tag: {
		type: Object as PropType<ICategorySearchTagItem>,
		default: () => ({})
	}
}
export type TypeMenuProps = ExtractPropTypes<typeof typeMenuProps>;

// clear | save | more 扩展图标组件接收的参数
export const extendIconProps = {
	disabled: {
		type: Boolean,
		default: false
	}
}
export type ExtendIconProps = ExtractPropTypes<typeof extendIconProps>;