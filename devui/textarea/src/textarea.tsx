import { defineComponent, ref } from 'vue';
import { textareaProps, TextareaProps } from './textarea-types';
import './textarea.scss';

export default defineComponent({
  name: 'DTextarea',
  props: textareaProps,
  emits: ['update:value', 'focus', 'blur', 'change', 'keydown'],
  setup(props: TextareaProps, ctx) {
    const textareaCls = {
      error: props.error,
      [props.cssClass]: true,
    };

    const curValueRef = ref<string>(props.value);
    const onInput = ($event: Event) => {
        const inputValue = ($event.target as HTMLInputElement).value;
        curValueRef.value = inputValue;
        ctx.emit('update:value', inputValue);
      },
      onFocus = ($event: Event) => {
        ctx.emit('focus', $event);
      },
      onBlur = ($event: Event) => {
        ctx.emit('blur', $event);
      },
      onChange = ($event: Event) => {
        ctx.emit('change', ($event.target as HTMLInputElement).value);
      },
      onKeydown = ($event: KeyboardEvent) => {
        ctx.emit('keydown', $event);
      };

    return {
      textareaCls,
      onInput,
      onFocus,
      onBlur,
      onChange,
      onKeydown,
      curValueRef,
      autofocus: props.autofocus,
    };
  },
  render() {
    const {
      id,
      placeholder,
      disabled,
      maxLength,
      resize,
      textareaCls,
      onInput,
      onFocus,
      onBlur,
      onChange,
      onKeydown,
      showCount,
      autofocus,
      curValueRef,
    } = this;
    return (
      <div class="devui-textarea-wrap">
        <textarea
          {...{ DTextarea: true }}
          id={id}
          value={curValueRef}
          autofocus={autofocus}
          placeholder={placeholder}
          disabled={disabled}
          maxlength={maxLength}
          style={{ resize: resize }}
          class={textareaCls}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          onKeydown={onKeydown}
        ></textarea>
        {showCount && (
          <div class="devui-textarea-show-count">
            {curValueRef.length}
            {!(maxLength ?? false) ? '' : ' / ' + maxLength}
          </div>
        )}
      </div>
    );
  },
});
