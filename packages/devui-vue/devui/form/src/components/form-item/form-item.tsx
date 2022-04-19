import { defineComponent, reactive, inject, onMounted, onBeforeUnmount, provide, ref } from 'vue';
import type { SetupContext } from 'vue';
import AsyncValidator, { Rules } from 'async-validator';
import mitt from 'mitt';
import { dFormEvents, dFormItemEvents, IForm, FORM_TOKEN, FORM_ITEM_TOKEN } from '../../form-types';
import { formItemProps, FormItemProps } from './form-item-types';
import { useFormItem } from './use-form-item';
import './form-item.scss';

export default defineComponent({
  name: 'DFormItem',
  props: formItemProps,
  setup(props: FormItemProps, ctx: SetupContext) {
    const formItemMitt = mitt();
    const dForm = reactive(inject(FORM_TOKEN, {} as IForm));
    const formData = reactive(dForm.formData);
    const initFormItemData = formData[props.field];
    const rules = reactive(dForm.rules);
    const { itemClasses } = useFormItem();

    const resetField = () => {
      if (Array.isArray(initFormItemData)) {
        formData[props.field] = [...initFormItemData];
      } else {
        formData[props.field] = initFormItemData;
      }
    };

    const formItem = reactive({
      dHasFeedback: props.dHasFeedback,
      field: props.field,
      formItemMitt,
      resetField,
    });
    provide(FORM_ITEM_TOKEN, formItem);

    const showMessage = ref(false);
    const tipMessage = ref('');

    const validate = (trigger: string) => {
      const ruleKey = props.field;
      const ruleItem = rules[ruleKey];
      const descriptor: Rules = {};
      descriptor[ruleKey] = ruleItem;

      const validator = new AsyncValidator(descriptor);

      validator
        .validate({ [ruleKey]: formData[ruleKey] })
        .then(() => {
          showMessage.value = false;
          tipMessage.value = '';
        })
        .catch(({ errors }) => {
          showMessage.value = true;
          tipMessage.value = errors[0].message;
        });
    };
    const validateEvents = [];

    const addValidateEvents = () => {
      if (rules && rules[props.field]) {
        const ruleItem = rules[props.field];
        let eventName = ruleItem['trigger'];

        if (Array.isArray(ruleItem)) {
          ruleItem.forEach((item) => {
            eventName = item['trigger'];
            const cb = () => validate(eventName);
            validateEvents.push({ eventName: cb });
            formItem.formItemMitt.on(dFormItemEvents[eventName], cb);
          });
        } else {
          const cb = () => validate(eventName);
          validateEvents.push({ eventName: cb });
          ruleItem && formItem.formItemMitt.on(dFormItemEvents[eventName], cb);
        }
      }
    };

    const removeValidateEvents = () => {
      if (rules && rules[props.field] && validateEvents.length > 0) {
        validateEvents.forEach((item) => {
          formItem.formItemMitt.off(item.eventName, item.cb);
        });
      }
    };

    onMounted(() => {
      dForm.formMitt.emit(dFormEvents.addField, formItem);
      addValidateEvents();
    });

    onBeforeUnmount(() => {
      dForm.formMitt.emit(dFormEvents.removeField, formItem);
      removeValidateEvents();
    });
    return () => <div class={itemClasses.value}>{ctx.slots.default?.()}</div>;
  },
});
