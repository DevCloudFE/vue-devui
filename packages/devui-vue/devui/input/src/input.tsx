import { defineComponent, computed, ref, watch, inject } from 'vue';
import { inputProps, InputType } from './use-input';
import './input.scss';
import { dFormItemEvents, IFormItem, formItemInjectionKey } from '../../form/src/form-types';

export default defineComponent({
  name: 'DInput',
  directives: {
    focus: {
      mounted: function (el, binding) {
        if (binding.value) {
          el.focus();
        }
      }
    }
  },
  props: inputProps,
  emits: ['update:modelValue', 'focus', 'blur', 'change', 'keydown'],
  setup(props, ctx) {
    const formItem = inject(formItemInjectionKey, {} as IFormItem);
    const hasFormItem = Object.keys(formItem).length > 0;
    const sizeCls = computed(() => `devui-input-${props.size}`);
    const showPwdIcon = ref(false);
    const inputType = ref<InputType>('text');
    const inputCls = computed(() => {
      return {
        error: props.error,
        [props.cssClass]: true,
        'devui-input-restore': showPwdIcon.value,
        [sizeCls.value]: props.size !== ''
      };
    });
    const showPreviewIcon = computed(() => inputType.value === 'password');
    watch(
      () => props.showPassword,
      (flg) => {
        inputType.value = flg ? 'password' : 'text';
        showPwdIcon.value = props.showPassword;
      },
      { immediate: true }
    );

    const onInput = ($event: Event) => {
        ctx.emit('update:modelValue', ($event.target as HTMLInputElement).value);
        hasFormItem && formItem.formItemMitt.emit(dFormItemEvents.input);
      },
      onFocus = () => {
        ctx.emit('focus');
      },
      onBlur = () => {
        ctx.emit('blur');
        hasFormItem && formItem.formItemMitt.emit(dFormItemEvents.blur);
      },
      onChange = ($event: Event) => {
        ctx.emit('change', ($event.target as HTMLInputElement).value);
        hasFormItem && formItem.formItemMitt.emit(dFormItemEvents.change);
      },
      onKeydown = ($event: KeyboardEvent) => {
        ctx.emit('keydown', $event);
      },
      onChangeInputType = () => {
        inputType.value = inputType.value === 'password' ? 'text' : 'password';
      };
    return {
      inputCls,
      inputType,
      showPreviewIcon,
      showPwdIcon,
      onInput,
      onFocus,
      onBlur,
      onChange,
      onKeydown,
      onChangeInputType
    };
  },
  render() {
    const {
      modelValue,
      showPreviewIcon,
      showPwdIcon,
      inputCls,
      inputType,
      maxLength,
      autoFocus,
      placeholder,
      disabled,
      onInput,
      onFocus,
      onBlur,
      onChange,
      onKeydown,
      onChangeInputType
    } = this;
    return (
      <div class='devui-input__wrap'>
        <input
          v-focus={autoFocus}
          {...{ dinput: true }}
          value={modelValue}
          disabled={disabled}
          type={inputType}
          maxlength={maxLength}
          placeholder={placeholder}
          class={inputCls}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          onKeydown={onKeydown}
        />
        {showPwdIcon && (
          <div class='devui-input__preview' onClick={onChangeInputType}>
            {showPreviewIcon ? (
              <d-icon name='preview-forbidden' size='12px' key={1} />
            ) : (
              <d-icon name='preview' size='12px' key={2} />
            )}
          </div>
        )}
      </div>
    );
  }
});
