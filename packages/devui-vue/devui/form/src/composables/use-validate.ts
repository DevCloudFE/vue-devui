import type { Rules, Values } from 'async-validator';
import AsyncValidator from 'async-validator';
import type { UseValidate } from '../form-types';
import {  getCurrentInstance } from 'vue';
import { createI18nTranslate } from '../../../locale/create';

const app = getCurrentInstance();
const t = createI18nTranslate('DForm', app);
export default function useValidate(): UseValidate {

  // 校验函数
  const validate = (descriptor: Rules, validateObject: Values) => {
    const validator = new AsyncValidator(descriptor);
    return validator.validate(validateObject);
  };

  // 创建内置校验器
  const createDevUIBuiltinValidator = (rule) => {
    let res = { ...rule };
    if(res.min !== undefined) {
      res = {
        ...res,
        message: res.message ?? `${t('minValue')}${res.min}`,
        asyncValidator: (r, val) => {
          return new Promise((resolve, reject) => {
            if(val < res.min) {
              reject(t('minValue') + res.min);
            }else {
              resolve(t('validSuccess'));
            }
          });
        }
      };
    }

    if(res.max !== undefined) {
      res = {
        ...res,
        message: res.message ?? `${t('maxValue')}${res.max}`,
        asyncValidator: (r, val) => {
          return new Promise((resolve, reject) => {
            if(val > res.max) {
              reject(t('maxValue') + res.max);
            }else {
              resolve(t('validSuccess'));
            }
          });
        }
      };
    }

    if(res.maxlength !== undefined) {
      res = {
        ...res,
        max: res.maxlength,
        message: res.message ?? `${t('maxLength')}${res.maxlength}`
      };
      delete res.maxlength;
      delete res.asyncValidator;
    }

    if(res.minlength !== undefined) {
      res = {
        ...res,
        min: res.minlength,
        message: res.message ?? `${t('minLength')}${res.minlength}`
      };
      delete res.minlength;
      delete res.asyncValidator;
    }


    if(res.requiredTrue !== undefined) {
      res = {
        ...res,
        message: res.message ?? `${t('isTrue')}`,
        asyncValidator: (r, val) => {
          return new Promise((resolve, reject) => {
            if(!val) {
              reject(t('isTrue'));
            }else {
              resolve(t('validSuccess'));
            }
          });
        }
      };
    }
    if(res.email !== undefined){
      res = {
        ...res,
        type: 'email',
        message: res.message ?? t('errorEmail')
      };
      delete res.asyncValidator;
    }
    if(res.pattern !== undefined){
      res = {
        ...res,
        type: 'pattern',
        message: res.message ?? t('errorRegular')
      };
      delete res.asyncValidator;
    }
    if(res.whitespace === true){
      res = {
        ...res,
        type: 'string',
        message: res.message ?? t('notOnlySpace'),
        asyncValidator: (r, val) => {
          return new Promise((resolve, reject) => {
            if(val.trim() === '') {
              reject(t('notOnlySpace'));
            }else {
              resolve(t('validSuccess'));
            }
          });
        }
      };
    }

    return res;
  };

  return { validate, createDevUIBuiltinValidator };
}
