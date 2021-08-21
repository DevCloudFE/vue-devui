import { defineComponent, computed, ref, watch, toRefs } from 'vue';
import { inputProps } from './use-input';
import './input.scss'

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
    const inputType = computed(() => props.showPassword ? 'password' : 'text');
    const onInput = ($event: Event) => {
      ctx.emit('update:value', ($event.target as HTMLInputElement).value);
    },
      onFocus = () => {
        ctx.emit('focus');
      },
      onBlur = () => {
        ctx.emit('blur');
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
      <div class="devui-input__wrap">
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
          onKeydown={onKeydown} 
        />
        {/* <div class="devui-input__preview">
          <d-icon name="preview" size="12px"></d-icon>
        </div> */}
      </div>
    );
  }
});
