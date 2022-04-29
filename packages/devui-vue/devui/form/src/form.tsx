import { defineComponent, provide, reactive, SetupContext, toRefs, watch } from 'vue';
import { formProps, FormProps, FORM_TOKEN } from './form-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import useFieldCollection from './composables/use-field-collection';
import useFormValidation from './composables/use-form-validation';

export default defineComponent({
  name: 'DForm',
  props: formProps,
  emits: ['validate'],
  setup(props: FormProps, ctx: SetupContext) {
    const ns = useNamespace('form');
    const { itemContexts, addItemContext, removeItemContext } = useFieldCollection();
    const { validate, validateFields, resetFields, clearValidate } = useFormValidation(itemContexts);

    const onSubmit = (e: Event) => {
      e.preventDefault();
    };

    watch(
      () => props.rules,
      () => {
        if (props.validateOnRuleChange) {
          validate();
        }
      },
      { deep: true }
    );

    provide(
      FORM_TOKEN,
      reactive({
        ...toRefs(props),
        emit: ctx.emit,
        addItemContext,
        removeItemContext,
      })
    );

    ctx.expose({
      validate,
      validateFields,
      resetFields,
      clearValidate,
    });

    return () => (
      <form onSubmit={onSubmit} class={ns.b()}>
        {ctx.slots.default?.()}
      </form>
    );
  },
});
