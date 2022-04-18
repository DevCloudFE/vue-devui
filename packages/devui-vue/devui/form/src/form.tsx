import { defineComponent, provide, SetupContext } from 'vue';
import mitt from 'mitt';
import { formProps, FormProps, IFormItem, dFormEvents, FORM_TOKEN } from './form-types';
import { EventBus } from './utils';
import { useNamespace } from '../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'DForm',
  props: formProps,
  emits: ['submit'],
  setup(props: FormProps, ctx: SetupContext) {
    const formMitt = mitt();
    const fields: IFormItem[] = [];
    const ns = useNamespace('form');
    const resetFormFields = () => {
      fields.forEach((field: IFormItem) => {
        field.resetField();
      });
    };

    formMitt.on(dFormEvents.addField, (field: any) => {
      if (field) {
        fields.push(field);
      }
    });

    formMitt.on(dFormEvents.removeField, (field: any) => {
      if (field.prop) {
        fields.splice(fields.indexOf(field), 1);
      }
    });

    provide(FORM_TOKEN, {
      formData: props.data,
      formMitt,
      labelData: {
        layout: props.layout,
        labelSize: props.labelSize,
        labelAlign: props.labelAlign,
      },
      rules: props.rules,
      messageShowType: 'popover',
    });

    const onSubmit = (e) => {
      e.preventDefault();
      ctx.emit('submit', e);
      EventBus.emit(`formSubmit:${props.name}`);
    };

    return () => (
      <form onSubmit={onSubmit} class={ns.b()}>
        {ctx.slots.default?.()}
      </form>
    );
  },
});
