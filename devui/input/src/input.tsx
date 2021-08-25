import { defineComponent, computed, inject, reactive } from 'vue';
import { inputProps } from './use-input';
import './input.scss'
import mitt from 'mitt';

export default defineComponent({
  name: 'DInput',
  props: inputProps,
  emits: ['update:value', 'focus', 'blur', 'change', 'keydown'],
  setup(props, ctx) {
    const sizeCls = computed(() => `devui-input-${props.size}`);
    const inputCls = computed(() => {
      return {
        error: props.error,
        [sizeCls.value]: props.size !== ''
      }
    });
    const formItem: any = inject('dFormItem');
    const inputType = computed(() => props.showPassword ? 'password' : 'text');
    const onInput = ($event: Event) => {
      ctx.emit('update:value', ($event.target as HTMLInputElement).value);
    },
      onFocus = () => {
        ctx.emit('focus');
      },
      onBlur = () => {
        ctx.emit('blur');
        formItem.formItemMitt.emit('d.form.inputBlur');
        console.log('formItem', formItem);
        console.log('test-> input blur');
        
        
        
      },
      onChange = ($event: Event) => {
        ctx.emit('change', ($event.target as HTMLInputElement).value);
      },
      onKeydown = ($event: KeyboardEvent) => {
        ctx.emit('keydown', $event);
      };

    return {
      inputCls,
      inputType,
      onInput,
      onFocus,
      onBlur,
      onChange,
      onKeydown
    };
  },
  render () {
    const {
      inputCls,
      inputType,
      placeholder,
      disabled,
      onInput,
      onFocus,
      onBlur,
      onChange,
      onKeydown,
      value
    } = this;

    return (
      <input
        {...{dinput: true}}
        value={value}
        disabled={disabled}
        type={inputType}
        placeholder={placeholder}
        class={inputCls}
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onKeydown={onKeydown} />
    );
  }
});
