import type { PropType, ExtractPropTypes, Ref, UnwrapNestedRefs, ComputedRef, UnwrapRef } from 'vue';

type TriggerTypes = 'hover' | 'click';

export interface CascaderItem {
  label: string;
  value: number | string;
  isLeaf?: boolean;
  children?: CascaderItem[];
  checked?: boolean;
  halfChecked?: boolean;
  disabled?: boolean;
  active?: boolean;
  _loading?: boolean;
  icon?: string;
  // 用户可以传入自定义属性，并在dropDownItemTemplate中使用
  [prop: string]: unknown;
}
export type CascaderModelValue = (string | number)[];
export type InputSize = 'sm' | 'md' | 'lg';
export type CascaderValueType = CascaderModelValue | [CascaderModelValue];
export const cascaderProps = {
  /**
   * 可选，指定展开次级菜单方式
   * @description 可选择的值 'hover', 'click'
   * @type {('hover'|'click')}
   * @default 'hover'
   */
  trigger: {
    type: String as PropType<TriggerTypes>,
    default: 'hover',
  },
  /**
   * 可选，单位 px，用于控制组件输入框宽度和下拉的宽度
   * @type { Number | String }
   * @default 200
   */
  width: {
    type: [Number, String],
    default: 200,
  },
  /**
   * 可选，单位 px，控制下拉列表的宽度，默认和组件输入框 width 相等
   * @type { Number | String }
   * @default 200
   */
  dropdownWidth: {
    type: [Number, String],
    default: 200,
  },
  /**
   * 必选，级联器的菜单信息
   * @type {CascaderItem[]}
   * @default []
   */
  options: {
    type: Array as PropType<CascaderItem[]>,
    default: [],
    required: true,
  },
  /**
   * 可选，级联器是否开启多选模式，开启后为 checkbox 选择
   * @type {Boolean}
   * @default false
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * 可选，级联器选中项是否显示路径，仅单选模式下生效
   */
  showPath: {
    type: Boolean,
    default: false,
  },
  /**
   * 可选，需要选中项的value集合
   * @type {CascaderValueType}
   * @default []
   */
  modelValue: {
    type: Array as PropType<CascaderValueType>,
    default: [],
  },
  'onUpdate:modelValue': {
    type: Function as PropType<(v: boolean) => void>,
  },
  /**
   * 可选，级联器是否禁用
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 可选，没有选择时的输入框展示信息
   * @type {string}
   * @default '''
   */
  placeholder: {
    type: String,
    default: '',
  },
  change: {
    type: Function as PropType<(v: CascaderValueType, k: CascaderItem[]) => void>,
    default: undefined,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  debounce: {
    type: Number,
    default: 300,
  },
  beforeFilter: {
    type: Function as PropType<(value: string) => boolean | Promise<unknown>>,
    default: () => true,
  },
  size: {
    type: String as PropType<InputSize>
  },
} as const;

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>;

export interface PopupTypes {
  menuShow: Ref<boolean>;
  menuOpenClass: Ref<string>;
  stopDefault: Ref<boolean>;
  openPopup: (e?: MouseEvent) => void;
  updateStopDefaultType: () => void;
}

export type CaascaderOptionsType = UnwrapNestedRefs<[CascaderItem[]]>;
export interface OptionsCallback {
  cascaderOptions: never | CaascaderOptionsType;
  changeCascaderIndexs: (optionItem: CascaderItem, ulIndex: number) => void;
}

export interface CascaderItemNeedType {
  valueCache?: CascaderValueType;
  trigger?: TriggerTypes;
  value?: CascaderValueType;
  inputValueCache?: Ref<string>;
  confirmInputValueFlg?: Ref<boolean>;
  multiple?: boolean;
  stopDefault?: Ref<boolean>;
  activeIndexs?: number[];
  tagList?: UnwrapNestedRefs<CascaderItem[]>;
}
export interface UseCascaderItemCallback {
  cascaderItemNeedProps: CascaderItemNeedType;
}

export type CheckedType = 'checked' | 'halfChecked';

export interface RootStyleFeedback {
  inputWidth: string;
}

export const cascaderulProps = {
  /**
   * 每个ul中的li
   * @type {CascaderItem[]}
   * @default []
   */
  cascaderItems: {
    type: Array as PropType<CascaderItem[]>,
    default: (): CascaderItem[] => [
      {
        label: '',
        value: '',
      },
    ],
  },
  /**
   * 可选，单位 px，控制下拉列表的宽度，默认和组件输入框 width 相等
   * @type { Number | String }
   * @default 200
   */
  dropdownWidth: {
    type: [Number, String],
    default: 200,
  },
  /**
   * 当前选中的ul下标
   * @type {Number}
   * @default 0
   */
  ulIndex: {
    type: Number,
    default: 0,
  },
  cascaderItemNeedProps: {
    type: Object as PropType<CascaderItemNeedType>,
    default: (): CascaderItemNeedType => ({}),
  },
  stopDefault: {
    type: Boolean,
    default: false,
  },
  cascaderOptions: {
    type: Array as unknown as PropType<[CascaderItem[]]>,
    default: (): [CascaderItem[]] => [
      [
        {
          label: '',
          value: '',
        },
      ],
    ],
  },
};
export type CascaderulProps = ExtractPropTypes<typeof cascaderulProps>;

export interface CascaderItemPropsType extends CascaderulProps {
  cascaderItem: CascaderItem;
  liIndex: number;
  cascaderItemNeedProps: CascaderItemNeedType;
}

export interface DropdownStyleFeedback {
  dropdownWidth: string;
}

export interface MultiplePropsType {
  activeOptions: CascaderItem[];
  placeholder: string;
}

export interface UpdateStatusCallback {
  updateStatus: (node: CascaderItem, options: CaascaderOptionsType, ulIndex: number) => void;
}

export interface suggestionListType {
  values: CascaderModelValue;
  labels: string[];
  labelsString?: string;
  disabled?: boolean;
}

export type UseFilterFn = {
  handleInput: (val: string) => void;
  suggestionsList: Ref<suggestionListType[]>;
  isSearching: Ref<boolean>;
  chooseSuggestion: (item: suggestionListType) => void;
};

export type UseCascaderFn = {
  origin: Ref<HTMLElement | undefined>;
  overlayRef: Ref<HTMLElement | undefined>;
  menuShow: Ref<boolean>;
  cascaderItemNeedProps: CascaderItemNeedType;
  rootClasses: ComputedRef<string>;
  menuOpenClass: Ref<string>;
  inputValue: Ref<string>;
  openPopup: () => void;
  rootStyle: RootStyleFeedback;
  showClearable: Ref<boolean>;
  position: Ref<string[]>;
  cascaderOptions: UnwrapRef<[CascaderItem[]]>;
  tagList: Ref<CascaderItem[]>;
  showClear: () => void;
  hideClear: () => void;
  clearData: (e: MouseEvent) => void;
  handleInput: (val: string) => void;
  multiple: Ref<boolean>;
  suggestionsList: Ref<suggestionListType[]>;
  isSearching: Ref<boolean>;
  chooseSuggestion: (item: suggestionListType) => void;
  onFocus: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
};
