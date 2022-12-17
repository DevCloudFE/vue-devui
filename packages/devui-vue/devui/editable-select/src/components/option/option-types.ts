import { ExtractPropTypes } from 'vue';

export const editableSelectOptionProps = {
  label: {
    type: String,
  },
  value: {
    type: [String, Number],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hovering: {
    type: Boolean,
    default: false,
  },
};

export type EditableSelectOptionProps = ExtractPropTypes<typeof editableSelectOptionProps>;
