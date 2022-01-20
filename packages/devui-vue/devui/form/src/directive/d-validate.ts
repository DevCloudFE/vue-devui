import AsyncValidator, { RuleItem } from 'async-validator';
import { VNode, DirectiveBinding, h, render } from 'vue';
import { debounce } from 'lodash-es';
import { EventBus, isObject, hasKey } from '../util';
import useValidate from '../use-validate';
import './style.scss';
import dPopover from '../../../popover/src/popover';
import {DFormValidateSubmitData} from '../form-types';

interface BindingValueRules {
  [prop:string]: unknown
}

interface BindingValue {
  prop: string
  modelName?: string
  rules: BindingValueRules
  validators?: any
  asyncValidators?: any
  errorStrategy?: 'pristine' | 'dirty'
  updateOn: 'blur' | 'change' | 'input' | 'submit'
  asyncDebounceTime?: number | string
  messageShowType?: 'popover' | 'text' | 'none'
  messageChange?: (msg, { errors, fields }) => {}
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode): void {
    let { prop, modelName, rules, validators, asyncValidators, errorStrategy, updateOn = 'input', asyncDebounceTime, messageShowType = 'popover', messageChange }: BindingValue = binding.value;
    const {instance, arg} = binding;
    const instanceRef = instance[Object.keys(instance.$refs)[0]];
    if(instanceRef && instanceRef?.messageShowType) {
      messageShowType = instanceRef.messageShowType;
    }
    const hasModelName = !!modelName || !!arg;

    const renderPopover = (msg, visible = true) => {
      if(messageShowType !== 'popover') return;
      el.style.position = 'relative';
      const popover = h(dPopover, {
        visible: !!msg,
        controlled: updateOn !== 'change',
        content: msg
      });
      const vn = h('div', {
        style: 'position: absolute; left: 50%; bottom: -10px;'
      }, popover)
      render(vn, el);
    }

    const tipEl = document.createElement('div');
    if(messageShowType === 'text') {
      el.parentNode.appendChild(tipEl);
    }

    const renderTipEl = (msg, visible = true) => {
      tipEl.innerText = msg;
      tipEl.style.display = visible ? 'block' : 'none';
      tipEl.setAttribute('class', 'devui-validate-tip');
    }

    const addElClass = (el: HTMLElement, className: string) => {
      let currentClasses = el.getAttribute('class');
      if(!currentClasses.includes(className)) {
        currentClasses = currentClasses.trim() + (currentClasses.trim() ? ' ' : '') + className;
      }
      el.setAttribute('class', currentClasses);
    }

    const removeElClass = (el: HTMLElement, className: string) => {
      let currentClasses = el.getAttribute('class');
      currentClasses = currentClasses.replace(className, '');
      el.setAttribute('class', currentClasses);
    }

    const {validate, createDevUIBuiltinValidator} = useValidate();
    let propRule = {} || [] as any; // 值为对象数组或单个对象

    const isCustomValidator = validators !== undefined || asyncValidators !== undefined;
    if(isCustomValidator) {
      validators && (rules = validators);
      asyncValidators && (rules = asyncValidators);
      if(asyncValidators) {
        let time = Number(asyncDebounceTime);
        if(isNaN(time)) {
          console.warn('[v-d-validate] invalid asyncDebounceTime');
          time = 300;
        }
        rules = asyncValidators.map(item => {
          let res = {
            message: item.message,
            asyncValidator: (rule, value) => {
              return new Promise(debounce((resolve, reject) => {
                const res = item.asyncValidator(rule, value);
                if(res) {
                  resolve('');
                }else {
                  reject(rule.message);
                }
              }, time))
            }, 
          } as any;
          return res;
        })
      }
    }else {
      if(Array.isArray(rules)) {
        rules.map(item => {
          return createDevUIBuiltinValidator(item);
        });
      }else {
        rules = createDevUIBuiltinValidator(rules);
      }
    }

    let descriptor: any = {
      [prop]: rules
    }
    const validateFn = async () => {
      const validateModel = {
        [prop]: hasModelName ? instance[modelName || arg][prop] : instance[prop]
      };
      return validate(descriptor, validateModel).then(res => {
        renderPopover('', false);
        removeElClass(el, 'devui-error');
        messageShowType === 'text' && renderTipEl('', true);
        return res;
      }).catch(({ errors, fields }) => {
        let msg = propRule.message ?? fields[prop][0].message;
        renderPopover(msg);
        addElClass(el, 'devui-error');
        messageShowType === 'text' && renderTipEl(msg, true);
        if(messageChange && typeof messageChange === 'function') {
          messageChange(msg, { errors, fields });
        }
        return { errors, fields };
      })
    }

    if(errorStrategy === 'pristine') {
      validateFn();
    }else {
      el.childNodes[0].addEventListener(updateOn, () => {
        validateFn();
      })
      if(updateOn === 'change') {
        el.childNodes[0].addEventListener('focus', () => {
          renderPopover('', false);
        })
      }
    }

    const getTargetParentElement = (el: HTMLElement, targetTag: string) => {
      let tempEl:HTMLElement = el;
      while(tempEl.tagName.toLocaleLowerCase() !== 'body') {
        if(tempEl.tagName.toLocaleLowerCase() === targetTag) {
          return tempEl;
        }
        tempEl = tempEl.parentElement;
      }
    }

    // 处理表单提交校验
    const formTag = getTargetParentElement(el, 'form') as HTMLFormElement;
    if(formTag) {
      const formName = formTag.name;
      const formSubmitDataCallback: any = (val: DFormValidateSubmitData) => {
        validateFn().then((res: any) => {
          val.callback(!!!res?.errors, { errors: res?.errors, fields: res?.fields });
        }).catch(({errors, fields}) => {
          console.log('validateFn {errors, fields}', {errors, fields});
        });
      };
      EventBus.on(`formSubmit:${formName}`, formSubmitDataCallback);
    }
    
  }
}
