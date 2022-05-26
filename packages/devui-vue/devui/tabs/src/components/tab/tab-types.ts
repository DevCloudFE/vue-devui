import { ExtractPropTypes, PropType } from 'vue';

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
} as const;

export type TabProps = ExtractPropTypes<typeof tabProps>;
