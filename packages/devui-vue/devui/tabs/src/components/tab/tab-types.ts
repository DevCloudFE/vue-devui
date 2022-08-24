import { ExtractPropTypes, PropType, Slots } from 'vue';

export const tabProps = {
  title: {
    type: [String, Number] as PropType<string | number>,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  closeable: {
    type: Boolean,
    default: false,
  },
} as const;

export type TabProps = ExtractPropTypes<typeof tabProps>;

export interface TabContext {
  uid: number | undefined;
  slots: Slots;
  props: TabProps;
}
