import { defineComponent, provide, reactive, SetupContext, toRefs } from 'vue';
import mitt from 'mitt';
import { formProps, FormProps, IFormItem, dFormEvents, FORM_TOKEN } from './form-types';
import { EventBus } from './utils';
import { useNamespace } from '../../shared/hooks/use-namespace';
import useFieldCollection from './composables/use-field-collection';
import useFormValidation from './composables/use-form-validation';

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
    const { data, layout, labelSize, labelAlign } = toRefs(props);
    const { itemContexts, addItemContext, removeItemContext } = useFieldCollection();
    const { validate, validateFields } = useFormValidation(itemContexts);

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

    provide(
      FORM_TOKEN,
      reactive({
        formData: data,
        formMitt,
        labelData: {
          layout: layout,
          labelSize: labelSize,
          labelAlign: labelAlign,
        },
        rules: props.rules,
        messageShowType: 'popover',
        addItemContext,
        removeItemContext,
      })
    );

    ctx.expose({
      validate,
      validateFields,
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
