import { defineComponent, onMounted, inject, reactive, toRefs, onBeforeUnmount, provide, toRef } from 'vue';
import type { SetupContext } from 'vue';
import { FORM_TOKEN } from '../../form-types';
import { FormItemContext, formItemProps, FormItemProps, FORM_ITEM_TOKEN } from './form-item-types';
import { useFormItem, useFormItemRule, useFormItemValidate } from './use-form-item';
import './form-item.scss';

export default defineComponent({
  name: 'DFormItem',
  props: formItemProps,
  setup(props: FormItemProps, ctx: SetupContext) {
    const formContext = inject(FORM_TOKEN);
    const { _rules } = useFormItemRule(props);
    const { itemClasses, isRequired } = useFormItem(_rules);
    const { validateState, validateMessage, validate } = useFormItemValidate(props, _rules);
    const context: FormItemContext = reactive({
      ...toRefs(props),
      isRequired,
      validateState,
      validateMessage,
      validate,
    });

    provide(FORM_ITEM_TOKEN, context);

    onMounted(() => {
      if (props.field) {
        formContext?.addItemContext(context);
      }
    });

    onBeforeUnmount(() => {
      formContext?.removeItemContext(context);
    });

    return () => <div class={itemClasses.value}>{ctx.slots.default?.()}</div>;
  },
});
