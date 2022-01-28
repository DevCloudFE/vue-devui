
import { defineComponent, provide } from 'vue'
import mitt from 'mitt'
import { formProps, FormProps, IFormItem, dFormEvents, formInjectionKey, IForm, DFormValidateSubmitData } from './form-types'
import { EventBus } from './util'
import './form.scss'


export default defineComponent({
  name: 'DForm',
  props: formProps,
  emits: ['submit', 'messageChange'],
  setup(props: FormProps, ctx) {
    const formMitt = mitt();
    const fields: IFormItem[] =  [];
    const resetFormFields = () => {
      fields.forEach((field: IFormItem) => {
        field.resetField();
        EventBus.emit(`formReset:${props.name}:${field.prop}`);
      })
    }

    formMitt.on(dFormEvents.addField, (field: any) => {
      if(field) {
        fields.push(field);
      }
    })

    formMitt.on(dFormEvents.removeField, (field: any) => {
      if(field.prop) {
        fields.splice(fields.indexOf(field), 1);
      }
    })

    let resultSet = {};
    formMitt.on('formItem:messageChange', (data: any) => {
      resultSet[data.prop] = data;
      delete resultSet[data.prop].prop;
      ctx.emit('messageChange', resultSet);
    });
    
    provide(formInjectionKey, {
      formData: props.formData,
      formMitt,
      labelData: {
        layout: props.layout,
        labelSize: props.labelSize,
        labelAlign: props.labelAlign,
      },
      rules: props.rules,
      columnsClass: props.columnsClass,
      messageShowType: props.messageShowType,
      validateResult: undefined
    });

    const onSubmit = (e) => {
      e.preventDefault();
      let isValid = true, resultList = [];
      const formSubmitData: DFormValidateSubmitData = {
        callback: (valid, result) => {
          // 收集校验回调结果（微任务，校验函数是Promise）
          if(!valid) {
            isValid = false;
          }
          resultList.push(result);
        }
      };
      // 通过宏任务，将之前微任务执行后的结果，统一emit出去
      setTimeout(() => {
        ctx.emit('submit', e, isValid, resultList);
      })
      EventBus.emit(`formSubmit:${props.name}`, formSubmitData);
    }
    
    return {
      fields,
      formMitt,
      onSubmit,
      resetFormFields
    }
  },
  render() {
    const {onSubmit, name} = this;
    return (
      <form onSubmit={onSubmit} class="devui-form" name={name} d-form="true">
        {this.$slots.default?.()}
      </form>
    );
  }
})
