import { defineComponent, computed, ref, watch, toRef, inject } from 'vue';
import { inputProps, InputType } from './use-input';
import './input.scss'
import { dFormItemEvents, IFormItem } from '../../form/src/form-types';

export default defineComponent({
  name: 'DInput',
  props: inputProps,
  emits: ['update:value', 'focus', 'blur', 'change', 'keydown'],
  setup(props, ctx) {
    const formItem: IFormItem = inject('dFormItem');
    const sizeCls = computed(() => `devui-input-${props.size}`);
    const showPwdIcon = ref(false)
    const inputType = ref<InputType>('text')
    const inputCls = computed(() => {
      return {
        error: props.error,
        [props.cssClass]: true,
        [sizeCls.value]: props.size !== ''
      }
    })
    const showPreviewIcon = computed(() => inputType.value === 'password')
    watch(() => props.showPassword, flg => {
      inputType.value = flg ? 'password' : 'text'
    }, { immediate: true })

    watch(() => props.value, value => {
      value && value.length > 0 ? showPwdIcon.value = true : showPwdIcon.value = false
    })

    const onInput = ($event: Event) => {
      ctx.emit('update:value', ($event.target as HTMLInputElement).value);
      formItem.formItemMitt.emit(dFormItemEvents.input);
    },
      onFocus = () => {
        ctx.emit('focus');
      },
      onBlur = () => {
        ctx.emit('blur');
        formItem.formItemMitt.emit(dFormItemEvents.blur);
      },
      onChange = ($event: Event) => {
        ctx.emit('change', ($event.target as HTMLInputElement).value);
        formItem.formItemMitt.emit(dFormItemEvents.change);
      },
      onKeydown = ($event: KeyboardEvent) => {
        ctx.emit('keydown', $event);
      },
      onChangeInputType = () => {
        inputType.value = inputType.value === 'password' ? 'text' : 'password'
      }

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
  render () {
    const {
      value,
      showPreviewIcon,
      showPwdIcon,
      inputCls,
      inputType,
      maxLength,
      placeholder,
      disabled,
      onInput,
      onFocus,
      onBlur,
      onChange,
      onKeydown,
      onChangeInputType,
    } = this;
    return (
      <div class="devui-input__wrap">
        <input
          {...{dinput: true}}
          value={value}
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
        {
          showPwdIcon && <div class="devui-input__preview" onClick={onChangeInputType}>
          { showPreviewIcon
            ? <d-icon name="preview" size="12px" key={1}/>
            : <d-icon name="preview-forbidden" size="12px" key={2} />
          }
        </div>}
      </div>
    );
  }
});
