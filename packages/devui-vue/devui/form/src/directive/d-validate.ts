import { VNode, DirectiveBinding, h, render, nextTick } from 'vue';
import { debounce } from 'lodash-es';
import { EventBus, transformCamelToDash } from '../util';
import useValidate from '../use-validate';
import dPopover from '../../../popover/src/popover';
import {DFormValidateSubmitData, positionType} from '../form-types';
import './style.scss';

interface BindingValueRules {
  [prop: string]: unknown;
}

interface BindingValue {
  prop: string;
  modelName?: string;
  rules: BindingValueRules;
  validators?: any;
  asyncValidators?: any;
  errorStrategy?: 'pristine' | 'dirty';
  updateOn: 'change' | 'input' | 'submit';
  asyncDebounceTime?: number | string;
  messageShowType?: 'popover' | 'text' | 'none';
  popPosition: string | string[];
  messageChange?: (msg, { errors, fields }) => {};
  [prop: string]: any;
}

const getTargetElement = (el: HTMLElement, targetTag: string) => {
  if (!el) {return;}
  let tempEl: HTMLElement = el;
  while(tempEl?.tagName && tempEl.tagName.toLocaleLowerCase() !== 'body') {
    if(tempEl.tagName.toLocaleLowerCase() === targetTag) {
      return tempEl;
    }
    tempEl = tempEl.parentElement;
  }
};

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding): void {
    let { prop, rules, validators, asyncValidators, errorStrategy, updateOn = 'input', asyncDebounceTime = 300, messageShowType = 'popover', messageChange, popPosition = ['right', 'bottom'] }: BindingValue = binding.value;
    const {instance, arg: modelName} = binding;

    const instanceRef = instance[Object.keys(instance.$refs)[0]];
    if(instanceRef && instanceRef?.messageShowType) {
      messageShowType = instanceRef.messageShowType;
    }
    const hasModelName = !!modelName;

    const objToStyleString = (obj: any = {}) => {
      let style = '';
      for (const key in obj) {
        style += `${transformCamelToDash(key)}: ${obj[key]};`;
      }
      return style;
    };

    const renderPopover = (msg, visible = true) => {
      if(messageShowType !== 'popover') {return;}
      el.style.position = 'relative';
      const popoverPosition = () => {
        return Array.isArray(popPosition) ? popPosition.join('-') : popPosition;
      };

      const popover = h(dPopover, {
        visible: visible,
        controlled: updateOn !== 'change',
        content: msg,
        popType: 'error',
        position: popoverPosition() as positionType,
      });

      // 这里使用比较hack的方法控制popover显隐，因为点击popover外部元素隐藏popover之后，再重新传入visible不起作用了，popover不会重新渲染了
      nextTick(() => {
        if(visible) {
          addElClass(popover.el as HTMLElement, 'devui-popover-isVisible');
        }else {
          removeElClass(popover.el as HTMLElement, 'devui-popover-isVisible');
        }
      });

      const popoverWrapperStyle = () => {
        const rect = el.getBoundingClientRect();
        const style: any = {
          position: 'absolute',
          height: 0,
          top: (rect.height / 2) + 'px',
          right: 0,
        };

        const p = popoverPosition();
        if(popPosition === 'bottom' || popPosition === 'top') {
          style.left = '50%';
        }
        if(popPosition === 'left' || popPosition === 'right') {
          style.top = 0;
        }
        if(p.includes('top')) {
          style.top = -(rect.height / 2) + 'px';
        }
        if(p.endsWith('-bottom')) {
          style.top = (rect.height / 2) + 'px';
        }
        if(p.includes('left')) {
          style.left = 0;
        }
        if(p.includes('right')) {
          delete style.left;
          style.right = 0;
        }

        if(p.startsWith('bottom')) {
          delete style.top;
          style.bottom = 0;
        }
        if(p.startsWith('top')) {
          delete style.bottom;
        }

        return objToStyleString(style);
      };

      const vn = h('div', {
        style: popoverWrapperStyle()
      }, popover);
      render(vn, el);
    };

    const tipEl = document.createElement('div');
    if(messageShowType === 'text') {
      el.parentNode.appendChild(tipEl);
    }

    const renderTipEl = (msg, visible = true) => {
      tipEl.innerText = msg;
      tipEl.style.display = visible ? 'block' : 'none';
      tipEl.setAttribute('class', 'devui-validate-tip');
    };

    const addElClass = (el: HTMLElement, className: string) => {
      let currentClasses = el.getAttribute('class');
      if(!currentClasses.includes(className)) {
        currentClasses = currentClasses.trim() + (currentClasses.trim() ? ' ' : '') + className;
      }
      el.setAttribute('class', currentClasses);
    };

    const removeElClass = (el: HTMLElement, className: string) => {
      let currentClasses = el.getAttribute('class');
      currentClasses = currentClasses.replace(className, '');
      el.setAttribute('class', currentClasses);
    };

    const {validate, createDevUIBuiltinValidator} = useValidate();
    const propRule = {} || [] as any; // 值为对象数组或单个对象

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
          const res = {
            message: item.message,
            asyncValidator: (rule, value) => {
              return new Promise(debounce((resolve, reject) => {
                const res = item.asyncValidator(rule, value);
                if(res) {
                  resolve('');
                }else {
                  reject(rule.message);
                }
              }, time));
            },
          } as any;
          return res;
        });
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

    const descriptor: any = {
      [prop]: rules
    };
    const validateFn = async () => {
      const validateModel = {
        [prop]: hasModelName ? instance[modelName][prop] : instance[prop]
      };
      return validate(descriptor, validateModel).then(res => {
        renderPopover('', false);
        removeElClass(el, 'devui-error');
        messageShowType === 'text' && renderTipEl('', true);
        return res;
      }).catch(({ errors, fields }) => {
        const msg = propRule.message ?? fields[prop][0].message;
        renderPopover(msg);
        addElClass(el, 'devui-error');
        messageShowType === 'text' && renderTipEl(msg, true);
        if(messageChange && typeof messageChange === 'function') {
          messageChange(msg, { errors, fields });
        }
        return { errors, fields };
      });
    };

    if(errorStrategy === 'pristine') {
      validateFn();
    }else {
      el.childNodes[0].addEventListener(updateOn, () => {
        validateFn();
      });
      if(updateOn === 'change') {
        el.childNodes[0].addEventListener('focus', () => {
          renderPopover('', false);
        });
      }
    }

    // 处理表单提交校验
    const formTag = getTargetElement(el, 'form') as HTMLFormElement;
    if(formTag && updateOn === 'submit') {
      const formName = formTag.name;
      const formSubmitDataCallback: any = (val: DFormValidateSubmitData) => {
        validateFn().then((res: any) => {
          val.callback(!!!res?.errors, { errors: res?.errors, fields: res?.fields });
        }).catch(({errors, fields}) => {
          console.log('validateFn {errors, fields}', {errors, fields});
        });
      };
      EventBus.on(`formSubmit:${formName}`, formSubmitDataCallback);
      EventBus.on(`formReset:${formName}:${prop}`, () => {
        renderPopover('', false);
        removeElClass(el, 'devui-error');
        messageShowType === 'text' && renderTipEl('', false);
      });
    }
  },

  beforeUnmount(el: HTMLElement, binding: DirectiveBinding) {
    const {prop} = binding.value;
    const formTag = getTargetElement(el, 'form') as HTMLFormElement;
    const formName = formTag.name;

    EventBus.off(`formSubmit:${formName}`);
    EventBus.off(`formReset:${formName}:${prop}`);
  }
};
