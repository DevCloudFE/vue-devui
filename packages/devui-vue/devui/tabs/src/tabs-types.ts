import type { ExtractPropTypes, PropType, Slot } from 'vue';

export type Active = string | number | null;

export type ITabsType = 'tabs' | 'pills' | 'options' | 'wrapped' | 'slider';

export interface TabsState {
  data?: any[];
  showContent: boolean;
  active: string | number;
  slots: Slot[];
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
  vertical: {
    type: Boolean,
    default: false,
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
} as const;

export type TabsProps = ExtractPropTypes<typeof tabsProps>;
