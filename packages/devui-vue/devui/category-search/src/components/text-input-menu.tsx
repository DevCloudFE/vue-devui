import { defineComponent, inject, reactive, ref } from 'vue';
import type { SetupContext } from 'vue';
import { Button } from '../../../button';
import { typeMenuProps, categorySearchInjectionKey } from '../category-search-types';
import type { TypeMenuProps, CategorySearchInjection } from '../category-search-types';

export default defineComponent({
  name: 'DCategorySearchTextInput',
  props: typeMenuProps,
  emits: ['close'],
  setup(props: TypeMenuProps, ctx: SetupContext) {
    const formEl = ref();
    const { rootProps, getTextInputValue } = inject(categorySearchInjectionKey) as CategorySearchInjection;
    const formData = reactive({
      text: props.tag.value!.value,
    });
    const onConfirmClick = () => {
      formEl.value.validate((isValid: boolean) => {
        if (isValid) {
          getTextInputValue(props.tag, formData.text as string);
          ctx.emit('close');
        }
      });
    };
    const onCancelClick = () => {
      ctx.emit('close');
    };

    return () => (
      <d-form ref={formEl} data={formData} pop-position={['right']}>
        <d-form-item field="text" rules={props.tag.validateRules}>
          <d-input
            v-model={formData.text}
            autocomplete="off"
            autofocus
            maxlength={props.tag.maxLength}
            placeholder={props.tag.placeholder || ''}></d-input>
        </d-form-item>
        <div class="dp-dropdown-operation-area">
          <Button variant="solid" onClick={onConfirmClick}>
            {rootProps.menuBtnConfig?.confirmText ?? '确定'}
          </Button>
          <Button variant="solid" color="secondary" onClick={onCancelClick}>
            {rootProps.menuBtnConfig?.cancelText ?? '取消'}
          </Button>
        </div>
      </d-form>
    );
  },
});
