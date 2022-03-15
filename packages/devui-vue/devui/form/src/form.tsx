
import { defineComponent, provide } from 'vue';
import mitt from 'mitt';
import { formProps, FormProps, IFormItem, dFormEvents, formInjectionKey, IForm } from './form-types';
import { EventBus } from './util';
import './form.scss';


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
      });
    };

    formMitt.on(dFormEvents.addField, (field: any) => {
      if(field) {
        fields.push(field);
      }
    });

    formMitt.on(dFormEvents.removeField, (field: any) => {
      if(field.prop) {
        fields.splice(fields.indexOf(field), 1);
      }
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
      messageShowType: 'popover'
    });

    const onSubmit = (e) => {
      e.preventDefault();
      ctx.emit('submit', e);
      EventBus.emit(`formSubmit:${props.name}`);
    };

    return {
      fields,
      formMitt,
      onSubmit,
      resetFormFields
    };
  },
  render() {
    const {onSubmit} = this;
    return (
      <form onSubmit={onSubmit} class="devui-form">
        {this.$slots.default?.()}
      </form>
    );
  }
});
