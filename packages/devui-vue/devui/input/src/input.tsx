import { defineComponent, watch, inject, toRefs, shallowRef } from 'vue';
import type { SetupContext } from 'vue';
import { inputProps, InputProps } from './input-types';
import { FORM_ITEM_TOKEN, FormItemContext } from '../../form/src/components/form-item/form-item-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useInputRender } from './composables/use-input-render';
import { useInputEvent } from './composables/use-input-event';
import { useInputFunction } from './composables/use-input-function';
import './input.scss';

export default defineComponent({
  name: 'DInput',
  inheritAttrs: false,
  props: inputProps,
  emits: ['update:modelValue', 'focus', 'blur', 'input', 'change', 'keydown'],
  setup(props: InputProps, ctx: SetupContext) {
    const formItemContext = inject(FORM_ITEM_TOKEN, undefined) as FormItemContext;
    const { modelValue, disabled } = toRefs(props);
    const ns = useNamespace('input');
    const { isFocus, wrapClasses } = useInputRender(props);
    const { onFocus, onBlur, onInput, onChange, onKeydown } = useInputEvent(isFocus, props, ctx);

    const input = shallowRef<HTMLInputElement>();
    const { select, focus, blur } = useInputFunction(input);

    watch(
      () => props.modelValue,
      () => {
        if (props.validateEvent) {
          formItemContext?.validate('change').catch((err) => console.warn(err));
        }
      }
    );

    ctx.expose({ select, focus, blur });

    return () => (
      <div class={wrapClasses.value}>
        <input
          ref={input}
          value={modelValue.value}
          disabled={disabled.value}
          class={ns.e('inner')}
          {...ctx.attrs}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          onKeydown={onKeydown}
        />
      </div>
    );
  },
});
