import { computed, inject, nextTick, onMounted, ref } from 'vue';
import { castArray, get, isFunction, clone, isEqual, set } from 'lodash';
import Schema from 'async-validator';
import type { ComputedRef, Ref } from 'vue';
import type { RuleItem } from 'async-validator';
import { FORM_TOKEN, FormContext, ValidateFailure } from '../../form-types';
import {
  FormItemProps,
  FormItemValidateState,
  UseFormItem,
  FormValidateCallback,
  FormRuleItem,
  UseFormItemValidate,
  MessageType,
  UseFormItemRule
} from './form-item-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';

function getFieldValue(obj: Record<string, unknown>, path: string) {
  return {
    get value() {
      return get(obj, path);
    },
    set value(val: unknown) {
      set(obj, path, val);
    },
  };
}

export function useFormItem(
  messageType: ComputedRef<MessageType>,
  _rules: ComputedRef<FormRuleItem[]>,
  validateState: Ref<FormItemValidateState>
): UseFormItem {
  const formContext = inject(FORM_TOKEN) as FormContext;
  const ns = useNamespace('form');

  const itemClasses = computed(() => ({
    [`${ns.em('item', 'horizontal')}`]: formContext.layout === 'horizontal',
    [`${ns.em('item', 'vertical')}`]: formContext.layout === 'vertical',
    [`${ns.em('item', 'error')}`]: messageType.value === 'text' && validateState.value === 'error',
  }));

  const isRequired = computed(() => _rules.value.some((rule) => Boolean(rule.required)));

  return { itemClasses, isRequired };
}

export function useFormItemRule(props: FormItemProps): UseFormItemRule {
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
  let initFieldValue: unknown = undefined;
  let isResetting = false;
  const computedField = computed(() => {
    return typeof props.field === 'string' ? props.field : '';
  });
  const fieldValue = computed(() => {
    const formData = formContext.data;
    if (!formData || !props.field) {
      return;
    }
    return getFieldValue(formData, props.field).value;
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
      .map(({ ...rule }) => rule);
  };

  const onValidateSuccess = () => {
    validateState.value = 'success';
    validateMessage.value = '';
    formContext.emit('validate', props.field, true, '');
  };
  const onValidateError = ({ errors }: ValidateFailure) => {
    validateState.value = 'error';
    validateMessage.value = errors?.[0]?.message || '';
    formContext.emit('validate', props.field, false, validateMessage.value);
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
    if (isResetting) {
      isResetting = false;
      return false;
    }
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

  const clearValidate = () => {
    validateState.value = '';
    validateMessage.value = '';
  };

  const resetField = async () => {
    if (!formContext.data || !props.field) {
      return;
    }
    const currentValue = getFieldValue(formContext.data, props.field);
    if (!isEqual(currentValue.value, initFieldValue)) {
      isResetting = true;
    }
    currentValue.value = initFieldValue;

    await nextTick();
    clearValidate();
  };

  onMounted(() => {
    initFieldValue = clone(fieldValue.value);
  });

  return { validateState, validateMessage, validate, resetField, clearValidate };
}
