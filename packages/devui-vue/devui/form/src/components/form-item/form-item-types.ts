import type { RuleItem, ValidateFieldsError } from 'async-validator';
import type { ComputedRef, ExtractPropTypes, PropType, InjectionKey, Ref } from 'vue';

export type FormItemValidateState = '' | 'error' | 'pending' | 'success';

export interface FormRuleItem extends RuleItem {
  trigger?: Array<string>;
}

export const formItemProps = {
  field: {
    type: String,
    default: '',
  },
  dHasFeedback: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: [Object, Array] as PropType<[FormRuleItem, Array<FormRuleItem>]>,
  },
};

export type FormItemProps = ExtractPropTypes<typeof formItemProps>;

export type FormValidateCallback = (isValid: boolean, invalidFields?: ValidateFieldsError) => void;
export type FormValidateResult = Promise<boolean>;

export interface FormItemContext extends FormItemProps {
  isRequired: boolean;
  validateState: FormItemValidateState;
  validateMessage: string;
  validate: (trigger: string, callback?: FormValidateCallback) => FormValidateResult;
}

export interface UseFormItem {
  itemClasses: ComputedRef<Record<string, boolean>>;
  isRequired: ComputedRef<boolean>;
}

export interface UseFormItemValidate {
  validateState: Ref<FormItemValidateState>;
  validateMessage: Ref<string>;
  validate: (trigger: string, callback?: FormValidateCallback) => FormValidateResult;
}

export const FORM_ITEM_TOKEN: InjectionKey<FormItemContext> = Symbol('dFormItem');
