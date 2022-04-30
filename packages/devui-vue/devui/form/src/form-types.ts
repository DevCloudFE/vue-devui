import type { ValidateError, ValidateFieldsError } from 'async-validator';
import type { PropType, ExtractPropTypes, InjectionKey, SetupContext } from 'vue';
import {
  FormItemContext,
  FormRuleItem,
  FormValidateCallback,
  FormValidateResult,
  MessageType,
  PopPosition,
} from './components/form-item/form-item-types';

export type Layout = 'horizontal' | 'vertical';
export type LabelSize = 'sm' | 'md' | 'lg';
export type LabelAlign = 'start' | 'center' | 'end';
export type FormData = Record<string, any>;

export type FormRules = Partial<Record<string, Array<FormRuleItem>>>;
export interface ValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export const formProps = {
  data: {
    type: Object as PropType<FormData>,
    default: () => ({}),
  },
  layout: {
    type: String as PropType<Layout>,
    default: 'horizontal',
  },
  labelSize: {
    type: String as PropType<LabelSize>,
    default: 'md',
  },
  labelAlign: {
    type: String as PropType<LabelAlign>,
    default: 'start',
  },
  rules: {
    type: Object as PropType<FormRules>,
  },
  messageType: {
    type: String as PropType<MessageType>,
    default: 'popover',
  },
  popPosition: {
    type: Array as PropType<Array<PopPosition>>,
    default: ['right', 'bottom'],
  },
  validateOnRuleChange: {
    type: Boolean,
    default: false,
  },
  showFeedback: {
    type: Boolean,
    default: false,
  },
} as const;

export interface UseFieldCollection {
  itemContexts: FormItemContext[];
  addItemContext: (field: FormItemContext) => void;
  removeItemContext: (field: FormItemContext) => void;
}

export interface UseFormValidation {
  validate: (callback?: FormValidateCallback) => FormValidateResult;
  validateFields: (fields: string[], callback: any) => FormValidateResult;
  resetFields: (fields: string[]) => void;
  clearValidate: (fields: string[]) => void;
}

export type FormProps = ExtractPropTypes<typeof formProps>;

export interface FormContext extends FormProps {
  emit: SetupContext['emit'];
  addItemContext: (field: FormItemContext) => void;
  removeItemContext: (field: FormItemContext) => void;
}

export const FORM_TOKEN: InjectionKey<FormContext> = Symbol('dForm');

export interface DValidateResult {
  errors: any;
  fields: any;
}

export interface DFormValidateSubmitData {
  callback(valid: boolean, result: DValidateResult): void;
}
