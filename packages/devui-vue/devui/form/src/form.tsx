import { defineComponent, provide, reactive, SetupContext, toRefs } from 'vue';
import { formProps, FormProps, FORM_TOKEN } from './form-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import useFieldCollection from './composables/use-field-collection';
import useFormValidation from './composables/use-form-validation';

export default defineComponent({
  name: 'DForm',
  props: formProps,
  setup(props: FormProps, ctx: SetupContext) {
    const ns = useNamespace('form');
    const { itemContexts, addItemContext, removeItemContext } = useFieldCollection();
    const { validate, validateFields } = useFormValidation(itemContexts);

    const onSubmit = (e: Event) => {
      e.preventDefault();
    };

    provide(
      FORM_TOKEN,
      reactive({
        ...toRefs(props),
        addItemContext,
        removeItemContext,
      })
    );

    ctx.expose({
      validate,
      validateFields,
    });

    return () => (
      <form onSubmit={onSubmit} class={ns.b()}>
        {ctx.slots.default?.()}
      </form>
    );
  },
});
