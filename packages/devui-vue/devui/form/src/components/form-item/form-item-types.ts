import type { RuleItem, ValidateFieldsError } from 'async-validator';
import type { ComputedRef, ExtractPropTypes, PropType, InjectionKey, Ref } from 'vue';
import { LabelAlign, LabelSize, Layout } from '../../form-types';
import { FeedbackStatus } from '../form-control/form-control-types';

export type FormItemValidateState = '' | 'error' | 'pending' | 'success';
export type MessageType = 'popover' | 'text' | 'none';
export type PopPosition =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';

export interface FormRuleItem extends RuleItem {
  trigger?: Array<string>;
}

export const formItemProps = {
  label: {
    type: String,
  },
  field: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  messageType: {
    type: String as PropType<MessageType>,
  },
  popPosition: {
    type: Array as PropType<Array<PopPosition>>,
  },
  rules: {
    type: [Object, Array] as PropType<[FormRuleItem, Array<FormRuleItem>]>,
  },
  showFeedback: {
    type: Boolean,
    default: undefined,
  },
  helpTips: {
    type: String,
    default: '',
  },
  feedbackStatus: {
    type: String as PropType<FeedbackStatus>,
  },
  extraInfo: {
    type: String,
    default: '',
  },
};

export type FormItemProps = ExtractPropTypes<typeof formItemProps>;

export type FormValidateCallback = (isValid: boolean, invalidFields?: ValidateFieldsError) => void;
export type FormValidateResult = Promise<boolean>;

export type LabelData = ComputedRef<{
  layout: Layout;
  labelSize: LabelSize;
  labelAlign: LabelAlign;
}>;

export interface FormItemContext extends FormItemProps {
  isRequired: boolean;
  validateState: FormItemValidateState;
  validateMessage: string;
  validate: (trigger: string, callback?: FormValidateCallback) => FormValidateResult;
  resetField: () => void;
  clearValidate: () => void;
}

export interface UseFormItem {
  itemClasses: ComputedRef<Record<string, boolean>>;
  isRequired: ComputedRef<boolean>;
}

export interface UseFormItemValidate {
  validateState: Ref<FormItemValidateState>;
  validateMessage: Ref<string>;
  validate: (trigger: string, callback?: FormValidateCallback) => FormValidateResult;
  resetField: () => void;
  clearValidate: () => void;
}

export const FORM_ITEM_TOKEN: InjectionKey<FormItemContext> = Symbol('dFormItem');
export const LABEL_DATA: InjectionKey<LabelData> = Symbol('labelData');
