import { defineComponent, reactive, inject, onMounted, onBeforeUnmount, provide, ref} from 'vue';
import AsyncValidator, { Rules } from 'async-validator';
import mitt from 'mitt';
import { dFormEvents, dFormItemEvents, IForm, formItemProps, formInjectionKey, formItemInjectionKey } from '../form-types';
import './form-item.scss';
import useValidate from '../use-validate';

export default defineComponent({
  name: 'DFormItem',
  props: formItemProps,
  setup(props, ctx) {
    const formItemMitt = mitt();
    let dForm = reactive(inject(formInjectionKey, {} as IForm));
    const formData = reactive(dForm.formData);
    const columnsClass = ref(dForm.columnsClass);
    const initFormItemData = formData[props.prop];
    const labelData = reactive(dForm.labelData);
    const rules = reactive(dForm.rules);
    
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

    const validate = (trigger: string) => {
      // console.log('trigger', trigger);
      const {validate: validateFn, createDevUIBuiltinValidator} = useValidate();
      const ruleKey = props.prop;
      let ruleItem = rules[ruleKey];
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
    const validateEvents = [];

    const addValidateEvents = () => {
      if(rules && rules[props.prop]) {
        const ruleItem = rules[props.prop];
        let eventName = ruleItem['trigger'];

        if(Array.isArray(ruleItem)) {
          ruleItem.forEach((item) => {
            eventName = item['trigger'];
            const cb = () => validate(eventName);
            validateEvents.push({eventName: cb});
            formItem.formItemMitt.on(dFormItemEvents[eventName], cb);
          });
        }else {
          const cb = () => validate(eventName);
          validateEvents.push({eventName: cb});
          ruleItem && formItem.formItemMitt.on(dFormItemEvents[eventName], cb);
        }
      }
    }

    const removeValidateEvents = () => {
      if(rules && rules[props.prop] && validateEvents.length > 0) {
        validateEvents.forEach(item => {
          formItem.formItemMitt.off(item.eventName, item.cb);
        });
      }
    }

    onMounted(() => {
      dForm.formMitt.emit(dFormEvents.addField, formItem);
      addValidateEvents();
    });

    onBeforeUnmount(() => {
      dForm.formMitt.emit(dFormEvents.removeField, formItem);
      removeValidateEvents();
    });
    return () => {
      return (
        <div class={`devui-form-item${isHorizontal ? '' : (isVertical ? ' devui-form-item-vertical' : ' devui-form-item-columns')}${isColumns ? ' devui-column-item ' + columnsClass.value : ''}`}>
          {ctx.slots.default?.()}
        </div>
      )
    }
  },
})