import type { ComputedRef, ExtractPropTypes, PropType } from 'vue';

export type Active = string | number | null;

export type ITabsType = 'tabs' | 'pills' | 'options' | 'wrapped' | 'slider';

export type ITabPositionType = 'top' | 'right' | 'bottom' | 'left';

export interface TabsState {
  data?: any[];
  showContent: boolean;
  active: string | number;
  slots: any[];
}

export interface TabsData {
  state: TabsState;
}

export const tabsProps = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: null,
  },

  type: {
    type: String as () => ITabsType,
    default: 'tabs',
  },
  showContent: {
    type: Boolean,
    default: true,
  },
  reactivable: {
    type: Boolean,
    default: true,
  },
  customWidth: {
    type: String,
    default: '',
  },
  cssClass: {
    type: String,
    default: '',
  },
  beforeChange: {
    type: Function as PropType<(id: Active) => boolean>,
    default: null,
  },
  closeable: {
    type: Boolean,
    default: false,
  },
  addable: {
    type: Boolean,
    default: false,
  },
  tabPosition: {
    type: String as () => ITabPositionType,
    default: 'top',
  },
} as const;

export type TabsProps = ExtractPropTypes<typeof tabsProps>;

export interface UseTabsEvent {
  onUpdateModelValue: (value: string | number) => void;
  onActiveTabChange: (value: string) => void;
  onTabRemove: (item: any, ev: MouseEvent) => void;
  onTabAdd: () => void;
  onTabChange: (id: string | undefined, type: string) => void;
}

export interface UseTabsRender {
  tabsClasses: ComputedRef<Record<string, boolean>>;
}
