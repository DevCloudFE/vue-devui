import { defineComponent, reactive, inject, onMounted, onBeforeUnmount, provide, ref, watch} from 'vue';
import AsyncValidator, { Rules } from 'async-validator';
import mitt from 'mitt';
import { dFormEvents, dFormItemEvents, IForm, formItemProps, formInjectionKey, formItemInjectionKey } from '../form-types';
import './form-item.scss';
import useValidate from '../use-validate';
import clickoutsideDirective from '../../../shared/devui-directive/clickoutside'


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
    const initFormItemData = formData[props.prop];
    const labelData = reactive(dForm.labelData);
    const rules = reactive(dForm.rules);
    let validateTrigger = 'input';
    const ruleItem = rules[props.prop];
    const getValidateTrigger = () => {
      if(rules && ruleItem) {
        if(Array.isArray(ruleItem)) {
          ruleItem.map(item => {
            item['trigger'] && (validateTrigger = item['trigger']);
          })
        }else {
          ruleItem['trigger'] && (validateTrigger = ruleItem['trigger']);
        }
      }
    }

    const resetField = () => {
      if(Array.isArray(initFormItemData)) {
        formData[props.prop] = [...initFormItemData];
      }else {
        formData[props.prop] = initFormItemData;
      }
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
      getValidateTrigger();
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
      validateTrigger === 'input' && validate();
      hasChange.value = newVal !== oldVal;
    }, {
      deep: true
    })

    // 通过ClickOutside模拟输入框change事件
    const handleClickOutside = () => {
      if(validateTrigger === 'change' && hasChange.value) {
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