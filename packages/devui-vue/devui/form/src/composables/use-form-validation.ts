import { castArray } from 'lodash';
import type { ValidateFieldsError } from 'async-validator';
import { UseFormValidation } from '../form-types';
import { FormItemContext, FormValidateCallback, FormValidateResult } from '../components/form-item/form-item-types';

export default function useFormValidation(itemContexts: FormItemContext[]): UseFormValidation {
  const getValidateFields = (fields: string[]) => {
    if (!itemContexts.length) {
      return [];
    }
    const normalizedFields = castArray(fields);
    const filteredFields = normalizedFields.length
      ? itemContexts.filter((context) => context.field && normalizedFields.includes(context.field))
      : itemContexts;

    if (!filteredFields.length) {
      return [];
    }
    return filteredFields;
  };

  const execValidateFields = async (fields: string[] = []): FormValidateResult => {
    const validateFields = getValidateFields(fields);

    if (!validateFields.length) {
      return true;
    }

    let errors: ValidateFieldsError = {};
    for (const field of validateFields) {
      try {
        await field.validate('');
      } catch (err) {
        errors = {
          ...errors,
          ...(err as ValidateFieldsError),
        };
      }
    }

    if (!Object.keys(errors).length) {
      return true;
    }
    return Promise.reject(errors);
  };

  const validateFields = async (fields: string[] = [], callback: any) => {
    try {
      const result = await execValidateFields(fields);
      if (result) {
        callback?.(result);
      }
      return result;
    } catch (err) {
      const invalidFields = err as ValidateFieldsError;
      callback?.(false, invalidFields);
      return !callback && Promise.reject(invalidFields);
    }
  };

  const validate = async (callback?: FormValidateCallback): FormValidateResult => validateFields(undefined, callback);

  const clearValidate = (fields: string[] = []) => {
    getValidateFields(fields).forEach((field) => field.clearValidate());
  };

  const resetFields = (fields: string[] = []) => {
    getValidateFields(fields).forEach((field) => field.resetField());
  };

  return { validate, validateFields, resetFields, clearValidate };
}
