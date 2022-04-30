import { defineComponent, onMounted, inject, reactive, toRefs, onBeforeUnmount, provide, computed } from 'vue';
import type { SetupContext } from 'vue';
import { FormContext, FORM_TOKEN } from '../../form-types';
import { FormItemContext, formItemProps, FormItemProps, FORM_ITEM_TOKEN } from './form-item-types';
import { useFormItem, useFormItemRule, useFormItemValidate } from './use-form-item';
import './form-item.scss';

export default defineComponent({
  name: 'DFormItem',
  props: formItemProps,
  setup(props: FormItemProps, ctx: SetupContext) {
    const formContext = inject(FORM_TOKEN) as FormContext;
    const { messageType: itemMessageType, popPosition: itemPopPosition, showFeedback: itemShowFeedback, ...otherProps } = toRefs(props);
    const showFeedback = computed(() => (itemShowFeedback?.value !== undefined ? itemShowFeedback.value : formContext.showFeedback));
    const messageType = computed(() => itemMessageType?.value || formContext.messageType);
    const popPosition = computed(() => itemPopPosition?.value || formContext.popPosition);
    const { _rules } = useFormItemRule(props);
    const { validateState, validateMessage, validate, resetField, clearValidate } = useFormItemValidate(props, _rules);
    const { itemClasses, isRequired } = useFormItem(messageType, _rules, validateState);
    const context: FormItemContext = reactive({
      ...otherProps,
      showFeedback,
      messageType,
      popPosition,
      isRequired,
      validateState,
      validateMessage,
      validate,
      resetField,
      clearValidate,
    });

    provide(FORM_ITEM_TOKEN, context);

    ctx.expose({
      resetField,
      clearValidate,
    });

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
