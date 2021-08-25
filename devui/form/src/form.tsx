import './form.scss'

import { defineComponent, provide } from 'vue'
import { formProps, FormProps, IFormItem, dFormEvents } from './form-types'
import mitt from 'mitt'

export default defineComponent({
  name: 'DForm',
  props: formProps,
  emits: ['submit'],
  setup(props: FormProps) {
    const formMitt = mitt();
    const fields: IFormItem[] =  [];
    const resetFormFields = () => {
      console.log('resetFormFields fields', fields);
      fields.forEach((field: IFormItem) => {
        console.log('resetFormFields field', field);
        field.resetField();
      })
    }

    formMitt.on(dFormEvents.addField, (field: any) => {
      console.log('dFormEvents.addField field', field);

      if(field) {
        fields.push(field);
      }

      console.log('dFormEvents.addField fields', fields);

    })

    formMitt.on(dFormEvents.removeField, field => {
      console.log('dFormEvents.removeField field', field);
      
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
    });

    console.log('form props', props);
    
    return {
      formMitt,
      fields,
      resetFormFields,
    }
  },
  render() {
    return (
      <form>
        {this.$slots.default?.()}
      </form>
    );
  }

})
