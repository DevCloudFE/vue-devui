import type { PropType, ExtractPropTypes, VNode, InjectionKey, Ref, SetupContext } from 'vue';
import type { Placement } from '../../overlay';

export interface RowData {
	checked?: boolean;
	disableCheck?: boolean;
	children?: RowData[];
	isLeaf?: boolean;
	[k: string]: any;
}
export type ColumnType = 'checkable' | 'index' | '';
export type ColumnAlign = 'left' | 'center' | 'right';
export type BorderType = '' | 'bordered' | 'borderless';
export type Size = 'mini' | 'xs' | 'sm' | 'md' | 'lg';
export type ShadowType = '' | 'shadowed';
export type FixedDirection = 'left' | 'right';
export type SortDirection = 'asc' | 'desc' | '';
export type CheckableRelation = 'upward' | 'downward' | 'both' | 'none';
export type SortMethod<T = RowData> = (a: T, b: T) => boolean;
export type RowClass = string | ((row: RowData, rowIndex: number) => string);
export type CellClass = string | ((row: RowData, rowIndex: number, column: ColumnConfig, columnIndex: number) => string);
export type RowKey = string | ((row: RowData) => string);
export interface TooltipConfig {
	content?: string;
	position?: Placement[];
	mouseEnterDelay?: number;
	enterable?: boolean;
	class?: string;
}
export interface FilterListItem {
	name: string;
	value: any;
	checked?: boolean;
}
export interface ColumnConfig {
	header: string;
	field: string;
	width?: number | string;
	minWidth?: number | string;
	maxWidth?: number | string;
	type?: ColumnType;
	resizable?: boolean;
	sortable?: boolean;
	showSortIcon?: boolean;
	sortMethod?: SortMethod;
	filterable?: boolean;
	showFilterIcon?: boolean;
	filterMultiple?: boolean;
	filterList?: FilterListItem[];
	filterChange?: (val: FilterListItem | FilterListItem[]) => void;
	filterMenu?: (scope: { toggleFilterMenu: (status?: boolean) => void; setFilterStatus: (status: boolean) => void }) => VNode;
	fixed?: FixedDirection;
	align?: ColumnAlign;
	showOverflowTooltip?: boolean | TooltipConfig;
	showHeadOverflowTooltip?: boolean | TooltipConfig;
	headRender?: (columnConfig: ColumnConfig) => VNode;
	cellRender?: (rowData: RowData, rowIndex: number, cellData: string, cellIndex: number) => VNode;
}
export interface InnerColumnConfig extends ColumnConfig {
	$columnId: string;
	offsetLeft: number;
	$showExpandTreeIcon?: boolean;
}
export interface InnerRowData extends RowData {
	$rowId?: string;
	$parentId?: string;
	$rowIndex?: number;
	$level?: number;
	height?: number;
	offsetTop?: number;
	showNode?: boolean; // 树表格时，控制是否展示子节点
	$expand?: boolean;
	halfChecked?: boolean;
	childList?: InnerRowData[];
	descendantList?: InnerRowData[];
}
export interface ScrollYParams {
	distance: number;
	renderCountPerScreen: number;
	scrollScaleY: number[];
	originRowData: InnerRowData[];
	defaultSortRowData: InnerRowData[];
}
export interface ScrollXParams {
	distance: number;
	totalColumn: number;
	bufferSize: number;
	scrollViewWidth: number;
	scrollScaleX: number[];
	originColumnData: InnerColumnConfig[];
}
export interface IExpandLoadMoreResult {
	node: InnerRowData;
	rowItems: RowData[];
}

export const dataGridProps = {
	columns: {
		type: Array as PropType<ColumnConfig[]>,
		default: () => []
	},
	data: {
		type: Array as PropType<RowData[]>,
		default: () => []
	},
	indent: {
		type: Number,
		default: 16
	},
	striped: {
		type: Boolean,
		default: false
	},
	fixHeader: {
		type: Boolean,
		default: false
	},
	rowHoveredHighlight: {
		type: Boolean,
		default: true
	},
	headerBg: {
		type: Boolean,
		default: false
	},
	showHeader: {
		type: Boolean,
		default: true
	},
	lazy: {
		type: Boolean,
		default: false
	},
	virtualScroll: {
		type: Boolean,
		default: false
	},
	reserveCheck: {
		type: Boolean,
		default: false
	},
	resizable: {
		type: Boolean,
	},
	rowClass: {
		type: [String, Function] as PropType<RowClass>,
		default: ''
	},
	rowKey: {
		type: [String, Function] as PropType<RowKey>,
	},
	cellClass: {
		type: [String, Function] as PropType<CellClass>,
		default: ''
	},
	size: {
		type: String as PropType<Size>,
		default: 'sm'
	},
	borderType: {
		type: String as PropType<BorderType>,
		default: ''
	},
	shadowType: {
		type: String as PropType<ShadowType>,
		default: ''
	},
	checkableRelation: {
		type: String as PropType<CheckableRelation>,
		default: 'both'
	}
}
export type DataGridProps = ExtractPropTypes<typeof dataGridProps>;

export interface DataGridContext {
	showHeader: Ref<boolean>;
	fixHeader: Ref<boolean>;
	lazy: Ref<boolean>;
	virtualScroll: Ref<boolean>;
	resizable: Ref<boolean>;
	indent: Ref<number>;
	bodyContentWidth: Ref<number>;
	bodyContentHeight: Ref<number>;
	translateX: Ref<number>;
	translateY: Ref<number>;
	bodyScrollLeft: Ref<number>;
	rowClass: Ref<RowClass>;
	cellClass: Ref<CellClass>;
	size: Ref<Size>;
	rootRef: Ref<HTMLElement | undefined>;
	scrollRef: Ref<HTMLElement | undefined>;
	headBoxRef: Ref<HTMLElement | undefined>;
	renderColumnData: Ref<InnerColumnConfig[]>;
	renderFixedLeftColumnData: Ref<InnerColumnConfig[]>;
	renderFixedRightColumnData: Ref<InnerColumnConfig[]>;
	renderRowData: Ref<InnerRowData[]>;
	rootCtx: SetupContext;
	allChecked: Ref<boolean>;
	halfAllChecked: Ref<boolean>;
	isTreeGrid: Ref<boolean>;
	execSortMethod: (direction: SortDirection, sortMethod?: SortMethod) => void;
	addGridThContextToMap: (key: ColumnConfig['field'], thCtx: GridThContext) => void;
	clearAllSortState: () => void;
	toggleRowExpansion: (node: InnerRowData, status?: boolean) => void;
	toggleRowChecked: (node: InnerRowData, status?: boolean) => void;
	toggleAllRowChecked: (status?: boolean) => void;
	afterColumnDragend: (columnId: InnerColumnConfig['$columnId'], offset: number) => void;
}
export const DataGridInjectionKey: InjectionKey<DataGridContext> = Symbol('d-data-grid');

export interface GridThContext {
	doSort: (direction: SortDirection) => void;
	doClearSort: () => void;
}

export const gridHeadProps = {
	columnData: {
		type: Array as PropType<InnerColumnConfig[]>,
		default: () => []
	},
	leftColumnData: {
		type: Array as PropType<InnerColumnConfig[]>,
		default: () => []
	},
	rightColumnData: {
		type: Array as PropType<InnerColumnConfig[]>,
		default: () => []
	},
	translateX: {
		type: Number,
		default: 0
	},
	bodyScrollLeft: {
		type: Number,
		default: 0
	}
}
export type GridHeadProps = ExtractPropTypes<typeof gridHeadProps>;

export const gridBodyProps = {
	rowData: {
		type: Array as PropType<InnerRowData[]>,
		default: () => []
	},
	columnData: {
		type: Array as PropType<InnerColumnConfig[]>,
		default: () => []
	},
	leftColumnData: {
		type: Array as PropType<InnerRowData[]>,
		default: () => []
	},
	rightColumnData: {
		type: Array as PropType<InnerRowData[]>,
		default: () => []
	},
	translateX: {
		type: Number,
		default: 0
	},
	translateY: {
		type: Number,
		default: 0
	},
	bodyScrollLeft: {
		type: Number,
		default: 0
	}
}
export type GridBodyProps = ExtractPropTypes<typeof gridBodyProps>;

export const gridThProps = {
	columnConfig: {
		type: Object as PropType<InnerColumnConfig>,
		default: () => ({})
	},
	mouseenterCb: {
		type: Function as PropType<(e: Event, tooltipConfig: InnerColumnConfig['showOverflowTooltip']) => void>,
		default: () => ({})
	},
	mouseleaveCb: {
		type: Function as PropType<(e: Event, tooltipConfig: InnerColumnConfig['showOverflowTooltip']) => void>,
		default: () => ({})
	}
}
export type GridThProps = ExtractPropTypes<typeof gridThProps>;

export const gridThFilterProps = {
	filterList: {
		type: Array as PropType<ColumnConfig['filterList']>,
		default: () => []
	},
	multiple: {
		type: Boolean,
		default: true,
	},
	showFilterIcon: {
		type: Boolean,
		default: false
	},
	filterMenu: {
		type: Function as PropType<ColumnConfig['filterMenu']>
	},
	setFilterStatus: {
		type: Function as PropType<(status: boolean) => void>,
		default() { }
	}
}
export type GridThFilterProps = ExtractPropTypes<typeof gridThFilterProps>;

export const gridTdProps = {
	rowData: {
		type: Object as PropType<InnerRowData>,
		default: () => ({})
	},
	cellData: {
		type: Object as PropType<InnerColumnConfig>,
		default: () => ({})
	},
	rowIndex: {
		type: Number,
		default: 0
	},
	mouseenterCb: {
		type: Function as PropType<(e: Event, tooltipConfig: InnerColumnConfig['showOverflowTooltip']) => void>,
		default: () => ({})
	},
	mouseleaveCb: {
		type: Function as PropType<(e: Event, tooltipConfig: InnerColumnConfig['showOverflowTooltip']) => void>,
		default: () => ({})
	}
}
export type GridTdProps = ExtractPropTypes<typeof gridTdProps>;