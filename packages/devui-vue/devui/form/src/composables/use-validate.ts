import type { Rules, Values } from 'async-validator';
import AsyncValidator from 'async-validator';
import type { UseValidate } from '../form-types';

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
        message: res.message ?? `最小值为${res.min}`,
        asyncValidator: (r, val) => {
          return new Promise((resolve, reject) => {
            if(val < res.min) {
              reject('最小值为' + res.min);
            }else {
              resolve('校验通过');
            }
          });
        }
      };
    }

    if(res.max !== undefined) {
      res = {
        ...res,
        message: res.message ?? `最大值为${res.max}`,
        asyncValidator: (r, val) => {
          return new Promise((resolve, reject) => {
            if(val > res.max) {
              reject('最大值为' + res.max);
            }else {
              resolve('校验通过');
            }
          });
        }
      };
    }

    if(res.maxlength !== undefined) {
      res = {
        ...res,
        max: res.maxlength,
        message: res.message ?? `最大长度为${res.maxlength}`
      };
      delete res.maxlength;
      delete res.asyncValidator;
    }

    if(res.minlength !== undefined) {
      res = {
        ...res,
        min: res.minlength,
        message: res.message ?? `最小长度为${res.minlength}`
      };
      delete res.minlength;
      delete res.asyncValidator;
    }


    if(res.requiredTrue !== undefined) {
      res = {
        ...res,
        message: res.message ?? `必须为true值`,
        asyncValidator: (r, val) => {
          return new Promise((resolve, reject) => {
            if(!val) {
              reject('必须为true值');
            }else {
              resolve('校验通过');
            }
          });
        }
      };
    }
    if(res.email !== undefined){
      res = {
        ...res,
        type: 'email',
        message: res.message ?? '邮箱格式不正确'
      };
      delete res.asyncValidator;
    }
    if(res.pattern !== undefined){
      res = {
        ...res,
        type: 'pattern',
        message: res.message ?? '正则不匹配'
      };
      delete res.asyncValidator;
    }
    if(res.whitespace === true){
      res = {
        ...res,
        type: 'string',
        message: res.message ?? '不能全为空格',
        asyncValidator: (r, val) => {
          return new Promise((resolve, reject) => {
            if(val.trim() === '') {
              reject('不能全为空格');
            }else {
              resolve('校验通过');
            }
          });
        }
      };
    }

    return res;
  };

  return { validate, createDevUIBuiltinValidator };
}
