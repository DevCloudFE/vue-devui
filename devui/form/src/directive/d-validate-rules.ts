import AsyncValidator from 'async-validator';
import { VNode } from 'vue';
import './style.scss';

// 获取async-validator可用的规则名
function getAvaliableRuleObj(ruleName: string, value) {
  if(!ruleName) {
    console.error("[v-d-validate] validator's key is invalid");
    return null;
  }
  switch(ruleName) {
    case 'maxlength':
      return {
        type: 'string',
        max: value,
        asyncValidator: (rule, val) => {
          return new Promise((resolve, reject) => {
            if(val.length > value) {
              reject('最大长度为' + value);
            }else {
              resolve('校验通过');
            }
          })
        }
      };
    case 'minlength':
      return {
        type: 'string',
        min: value,
        asyncValidator: (rule, val) => {
          return new Promise((resolve, reject) => {
            if(val.length < value) {
              reject('最小长度为' + value);
            }else {
              resolve('校验通过');
            }
          })
        }
      };
    case 'min':
      return {
        type: 'number',
        asyncValidator: (rule, val) => {
          return new Promise((resolve, reject) => {
            if(val < value) {
              reject('最小值为' + value);
            }else {
              resolve('校验通过');
            }
          })
        }
      };
    case 'max':
      return {
        type: 'number',
        asyncValidator: (rule, val) => {
          return new Promise((resolve, reject) => {
            if(val > value) {
              reject('最大值为' + value);
            }else {
              resolve('校验通过');
            }
          })
        }
      };
    case 'required':
      return {
        reqiured: true,
        asyncValidator: (rule, val) => {
          return new Promise((resolve, reject) => {
            if(!val) {
              reject('必填项');
            }else {
              resolve('校验通过');
            }
          })
        }
      };
    case 'requiredTrue':
      return {
        asyncValidator: (rule, val) => {
          return new Promise((resolve, reject) => {
            if(!val) {
              reject('必须为true值');
            }else {
              resolve('校验通过');
            }
          })
        }
      };
    case 'email':
      return {
        type: 'email',
        message: '邮箱格式不正确'
      };
    case 'pattern':
      return {
        type: 'regexp',
        pattern: value,
        message: '只能包含数字与大小写字符',
        validator: (rule, val) => value.test(val),
      };
    case 'whitespace':
      return {
        message: '输入不能全部为空格或空字符',
        validator: (rule, val) => !!val.trim()
      };
    default: 
      return {
        [ruleName]: value,
      };
  }
}

function getKeyValueOfObjectList(obj): {key: string; value: any;}[] {
  const kvArr = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      kvArr.push({
        key,
        value: obj[key]
      })
    }
  }
  return kvArr;
}


function isObject(obj): boolean {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
}


function hasKey(obj, key): boolean {
  if (!isObject(obj)) return false;
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function handleErrorStrategy(el: HTMLElement): void {
  const classList: Array<string> =  [...el.classList];
  classList.push('d-validate-rules-error-pristine');
  el.setAttribute('class', classList.join(' '));
}

function handleErrorStrategyPass(el: HTMLElement): void {
  console.log('handleErrorStrategyPass');
  
  const classList: Array<string> =  [...el.classList];
  const index = classList.indexOf('d-validate-rules-error-pristine');
  index !== -1 && classList.splice(index, 1);
  console.log('handleErrorStrategyPass classList', classList);
  
  el.setAttribute('class', classList.join(' '));
}

export default {

  mounted(el: HTMLElement, binding: any, vnode: VNode): void {
    const hasOptions = isObject(binding.value) && hasKey(binding.value, 'options');
    const {rules: bindingRules, options = {}} = binding.value;
    let {errorStrategy} = binding.value;

    // 判断是否有options，有就取binding.value对象中的rules对象，再判断有没有rules对象，没有就取binding.value
    const bindRules = hasOptions ? bindingRules : (bindingRules ? bindingRules : binding.value);

    const isCustomValidator = bindRules && isObject(bindRules) && (hasKey(bindRules, 'validators') || hasKey(bindRules, 'asyncValidators'));
    
    const rules = Array.isArray(bindRules) ? bindRules : [bindRules];
    const tipEl = document.createElement('span');
    el.parentNode.append(tipEl);

    const descriptor = {
      modelName: []
    };

    rules.forEach((rule) => {
      const kvObjList = getKeyValueOfObjectList(rule);
      let ruleObj = {};
      let avaliableRuleObj = {};
      kvObjList.forEach(item => {
        avaliableRuleObj = getAvaliableRuleObj(item.key, item.value);
        ruleObj = {...ruleObj, ...avaliableRuleObj};
      });
      descriptor.modelName.push(ruleObj);
    });

    // 使用自定义的验证器
    if(isCustomValidator) {
      descriptor.modelName = [];
      const {validators, asyncValidators} = bindRules;

      // 校验器
      validators && validators.forEach(rule => {
        const ruleObj = {
          message: rule?.message || '',
          validator: (r, value) => rule.validator(value),
        }
        descriptor.modelName.push(ruleObj);
      });

      // 异步校验器
      asyncValidators && asyncValidators.forEach(rule => {
        const ruleObj = {
          message: rule?.message || '',
          asyncValidator: (r, value, callback) => {
            return new Promise((resolve, reject) => {
              const res = rule.asyncValidator(value, callback);
              if(res) {
                resolve('');
              }else {
                reject(r.message);
              }
            })
          },
        }
        descriptor.modelName.push(ruleObj);
      });
    }

    // errorStrategy可配置在options对象中
    const { updateOn = 'change', errorStrategy: optionsErrorStrategy = 'dirty'} = options;
    if(!errorStrategy) {
      errorStrategy = optionsErrorStrategy;
    }

    const validator = new AsyncValidator(descriptor);
    let modelValue = vnode.children[0].props.value;
    vnode.children[0].el.addEventListener(updateOn, (e) => {
      // console.log('onInput', e.target.value);
      modelValue = e.target.value;
      validator.validate({modelName: modelValue}).then(() => {
        tipEl.style.display = 'none';
        handleErrorStrategyPass(el);
      }).catch((err) => {
        // console.log('validate error', err);
        const { errors } = err;
        if(!errors || errors.length === 0) return;
        let msg = '';

        // todo: 待支持国际化
        if(typeof errors[0].message === 'object') {
          msg = errors[0].message.default;
        }else {
          msg = errors[0].message;
        }
        tipEl.innerText = '' + msg;
        tipEl.style.display = 'inline-flex';
        tipEl.setAttribute('class', 'd-validate-tip');
        handleErrorStrategy(el);
      })
    });

    // 设置errorStrategy
    if(errorStrategy === 'pristine') {
      handleErrorStrategy(el);
      // pristine为初始化验证，初始化时需改变下原始值才能出发验证
      vnode.children[0].props.value = '' + vnode.children[0].props.value;
    }
  }
}
