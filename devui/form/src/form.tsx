import './form.scss'

import { defineComponent, provide } from 'vue'
import { formProps, FormProps, IFormItem, dFormEvents } from './form-types'
import mitt from 'mitt'

export default defineComponent({
  name: 'DForm',
  props: formProps,
  emits: ['submit'],
  setup(props: FormProps, ctx) {
    const formMitt = mitt();
    const fields: IFormItem[] =  [];
    const resetFormFields = () => {
      fields.forEach((field: IFormItem) => {
        field.resetField();
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
    
    provide('dForm', {
      formData: props.formData,
      formMitt,
      labelData: {
        layout: props.layout,
        labelSize: props.labelSize,
        labelAlign: props.labelAlign,
      },
      rules: props.rules,
      columnsClass: props.columnsClass
    });

    const onSubmit = (e) => {
      e.preventDefault();
      ctx.emit('submit');
    }
    
    return {
      fields,
      formMitt,
      onSubmit,
      resetFormFields
    }
  },
  render() {
    const {onSubmit} = this;
    return (
      <form onSubmit={onSubmit} class="d-form">
        {this.$slots.default?.()}
      </form>
    );
  }
})
