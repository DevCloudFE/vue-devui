import { defineComponent, reactive, inject, onMounted, onBeforeUnmount, provide, ref, watch} from 'vue';
import { Rules } from 'async-validator';
import mitt from 'mitt';
import {cloneDeep} from 'lodash-es';
import { dFormEvents, IForm, formItemProps, formInjectionKey, formItemInjectionKey } from '../form-types';
import useValidate from '../use-validate';
import clickoutsideDirective from '../../../shared/devui-directive/clickoutside'
import './form-item.scss';

export default defineComponent({
  name: 'DFormItem',
  directives: {
    clickoutside: clickoutsideDirective
  },
  props: formItemProps,
  setup(props, ctx) {
    const formItemMitt = mitt();
    let dForm = reactive(inject(formInjectionKey, {} as IForm));
    const formData = reactive(dForm.formData);
    const columnsClass = ref(dForm.columnsClass);
    const initedFormItemData = cloneDeep(formData[props.prop]);
    const labelData = reactive(dForm.labelData);
    const rules = reactive(dForm.rules);
    let updateOn = 'input';
    const ruleItem = rules[props.prop];
    const getValidateUpdateOn = () => {
      if(rules && ruleItem) {
        if(Array.isArray(ruleItem)) {
          ruleItem.map(item => {
            item['updateOn'] && (updateOn = item['updateOn']);
          })
        }else {
          ruleItem['updateOn'] && (updateOn = ruleItem['updateOn']);
        }
      }
    }

    const resetField = () => {     
      formData[props.prop] = cloneDeep(initedFormItemData);
      formItem.showMessage = false;
      formItem.tipMessage = '';
    }
    const showMessage = ref(false);
    const tipMessage = ref('');
    const formItem = reactive({
      dHasFeedback: props.dHasFeedback,
      prop: props.prop,
      showMessage: showMessage.value,
      tipMessage: tipMessage.value,
      formItemMitt,
      resetField			
    })
    provide(formItemInjectionKey, formItem);

    const isHorizontal = labelData.layout === 'horizontal';
    const isVertical = labelData.layout === 'vertical';
    const isColumns = labelData.layout === 'columns';

    const validate = () => {
      const {validate: validateFn, createDevUIBuiltinValidator} = useValidate();
      const ruleKey = props.prop;
      let ruleItem = rules[ruleKey];
      if(!ruleItem) return;
      ruleItem = ruleItem.map(item => {
        return createDevUIBuiltinValidator(item);
      });
      const descriptor: Rules = {};
      descriptor[ruleKey] = ruleItem;

      validateFn(descriptor, {[ruleKey]: formData[ruleKey]}).then(() => {
        showMessage.value = false;
        tipMessage.value = '';
        dForm.validateResult = {
          prop: props.prop,
          valid: true,
          message: '', 
          errors: null, 
          fields: null,
        }
      }).catch(({ errors, fields }) => {
        // console.log('validator errors', errors);
        showMessage.value = true;
        tipMessage.value = errors[0].message;
        dForm.validateResult = {
          prop: props.prop,
          valid: false,
          message: errors[0].message, 
          errors, 
          fields,
        }
      }).finally(() => {
        formItem.showMessage = showMessage.value;
        formItem.tipMessage = tipMessage.value;
        dForm.formMitt.emit(`formItem:messageChange`, dForm.validateResult);
      });
    }

    onMounted(() => {
      dForm.formMitt.emit(dFormEvents.addField, formItem);
      getValidateUpdateOn();
    });

    onBeforeUnmount(() => {
      dForm.formMitt.emit(dFormEvents.removeField, formItem);
    });

    // 标志表单域的change
    let hasChange = ref(false);

    // 通过watch表单的数据变化进行校验，有2个好处：
    // 1. 这样可以不用侵入其他组件去写一些表单相关的代码
    // 2. 可以不使用EventBus即可监听到表单域的数据变化，减少EventBus的使用
    watch(() => formData[props.prop], (newVal, oldVal) => {
      updateOn === 'input' && validate();
      hasChange.value = newVal !== oldVal;
    }, {
      deep: true
    })

    // 通过ClickOutside模拟输入框change事件
    const handleClickOutside = () => {
      if(updateOn === 'change' && hasChange.value) {
        validate();
      }
      hasChange.value = false;
    }

    return () => {
      return (
        <div class={`devui-form-item${isHorizontal ? '' : (isVertical ? ' devui-form-item-vertical' : ' devui-form-item-columns')}${isColumns ? ' devui-column-item ' + columnsClass.value : ''}`} 
        v-clickoutside={handleClickOutside}>
          {ctx.slots.default?.()}
        </div>
      )
    }
  },
})