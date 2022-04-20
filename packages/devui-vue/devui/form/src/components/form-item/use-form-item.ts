import { computed, reactive, inject, ref } from 'vue';
import { castArray, get, isFunction } from 'lodash';
import Schema from 'async-validator';
import type { ComputedRef } from 'vue';
import type { RuleItem } from 'async-validator';
import { FORM_TOKEN, FormContext, ValidateFailure } from '../../form-types';
import {
  FormItemProps,
  FormItemValidateState,
  UseFormItem,
  FormValidateCallback,
  FormRuleItem,
  UseFormItemValidate,
} from './form-item-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';

export function useFormItem(): UseFormItem {
  const formContext = reactive(inject(FORM_TOKEN) as FormContext);
  const labelData = reactive(formContext.labelData);
  const ns = useNamespace('form');

  const itemClasses = computed(() => ({
    [`${ns.em('item', 'horizontal')}`]: labelData.layout === 'horizontal',
    [`${ns.em('item', 'vertical')}`]: labelData.layout === 'vertical',
  }));

  return { itemClasses };
}

export function useFormItemRule(props: FormItemProps) {
  const formContext = inject(FORM_TOKEN) as FormContext;
  const _rules = computed(() => {
    const rules = (props.rules ? castArray(props.rules) : []) as FormRuleItem[];

    const formRules = formContext.rules;
    if (formRules && props.field) {
      const _itemRules = get(formRules, props.field, undefined);
      if (_itemRules) {
        rules.push(...castArray(_itemRules));
      }
    }

    if (props.required) {
      rules.push({ required: Boolean(props.required) });
    }

    return rules;
  });

  return { _rules };
}

export function useFormItemValidate(props: FormItemProps, _rules: ComputedRef<FormRuleItem[]>): UseFormItemValidate {
  const formContext = inject(FORM_TOKEN) as FormContext;
  const validateState = ref<FormItemValidateState>('');
  const validateMessage = ref('');
  const computedField = computed(() => {
    return typeof props.field === 'string' ? props.field : '';
  });
  const fieldValue = computed(() => {
    const formData = formContext.formData;
    if (!formData || !props.field) {
      return;
    }
    return formData[props.field];
  });

  const getRuleByTrigger = (triggerVal: string) => {
    return _rules.value
      .filter((rule) => {
        if (!rule.trigger || !triggerVal) {
          return true;
        }
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.includes(triggerVal);
        } else {
          return rule.trigger === triggerVal;
        }
      })
      .map(({ trigger, ...rule }) => rule);
  };

  const onValidateSuccess = () => {
    validateState.value = 'success';
    validateMessage.value = '';
  };
  const onValidateError = ({ errors }: ValidateFailure) => {
    validateState.value = 'error';
    validateMessage.value = errors?.[0]?.message || '';
  };

  const execValidate = async (rules: RuleItem[]) => {
    const ruleName = computedField.value;
    const validator = new Schema({
      [ruleName]: rules,
    });

    return validator
      .validate({ [ruleName]: fieldValue.value }, { firstFields: true })
      .then(() => {
        onValidateSuccess();
        return true;
      })
      .catch((error: ValidateFailure) => {
        onValidateError(error);
        return Promise.reject(error);
      });
  };

  const validate = async (trigger: string, callback?: FormValidateCallback) => {
    const rules = getRuleByTrigger(trigger);
    if (!rules.length) {
      callback?.(true);
      return true;
    }

    validateState.value = 'pending';

    return execValidate(rules)
      .then(() => {
        callback?.(true);
        return true;
      })
      .catch((error: ValidateFailure) => {
        const { fields } = error;
        callback?.(false, fields);
        return isFunction(callback) ? false : Promise.reject(fields);
      });
  };

  return { validateState, validateMessage, validate };
}
