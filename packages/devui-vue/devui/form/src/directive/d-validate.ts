import AsyncValidator, { RuleItem } from 'async-validator';
import { VNode, DirectiveBinding, h, render } from 'vue';
import { debounce } from 'lodash-es';
import { EventBus, isObject, hasKey } from '../util';
import useValidate from '../use-validate';
import './style.scss';
import dPopover from '../../../popover/src/popover';

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
    const hasModelName = !!modelName || !!arg;
    
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

    console.log('descriptor', descriptor)
    console.log('rules', rules)

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

    const validateFn = () => {
      const validateModel = {
        [prop]: hasModelName ? instance[modelName || arg][prop] : instance[prop]
      };
      validate(descriptor, validateModel).then(res => {
        console.log('校验成功', res);
        renderPopover('', false);
        messageShowType === 'text' && renderTipEl('', true);
      }).catch(({ errors, fields }) => {
        console.log('校验失败 errors', errors);
        console.log('校验失败 fields', fields);
        let msg = propRule.message ?? fields[prop][0].message;
        renderPopover(msg);
        messageShowType === 'text' && renderTipEl(msg, true);
        if(messageChange && typeof messageChange === 'function') {
          messageChange(msg, { errors, fields });
        }
      })
    }

    if(errorStrategy === 'pristine') {
      validateFn();
    }else {
      el.childNodes[0].addEventListener(updateOn, () => {
        console.log('onInput');
        
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
      EventBus.on(`formSubmit:${formName}`, (val) => {
        validateFn();
      })
    }
    
  }
}
