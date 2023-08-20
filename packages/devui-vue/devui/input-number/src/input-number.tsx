import { defineComponent, toRefs, watch, inject } from 'vue';
import type { SetupContext } from 'vue';
import { inputNumberProps, InputNumberProps } from './input-number-types';
import { IncIcon, DecIcon } from './input-number-icons';
import { useRender, useEvent, useExpose } from './use-input-number';
import './input-number.scss';
import form, { FORM_ITEM_TOKEN, FormItemContext } from '../../form';

export default defineComponent({
  name: 'DInputNumber',
  props: inputNumberProps,
  emits: ['update:modelValue', 'change', 'input'],
  setup(props: InputNumberProps, ctx: SetupContext) {
    const { disabled } = toRefs(props);
    const { wrapClass, customStyle, otherAttrs, controlButtonsClass, inputWrapClass, inputInnerClass } = useRender(props, ctx);
    const { inputRef } = useExpose(ctx);
    const { inputVal, minDisabled, maxDisabled, onAdd, onSubtract, onInput, onChange } = useEvent(props, ctx, inputRef);
    const formItemContext = inject(FORM_ITEM_TOKEN, undefined) as FormItemContext;

    watch(
      () => props.modelValue,
      () => {
        formItemContext?.validate('change').catch(() => {});
      }
    );

    return () => (
      <div class={wrapClass.value} {...customStyle}>
        <div class={controlButtonsClass.value}>
          <span class={['control-button control-inc', { disabled: maxDisabled.value }]} onClick={onAdd}>
            <IncIcon />
          </span>
          <span class={['control-button control-dec', { disabled: minDisabled.value }]} onClick={onSubtract}>
            <DecIcon />
          </span>
        </div>
        <div class={inputWrapClass.value}>
          <input
            ref={inputRef}
            value={inputVal.value}
            placeholder={props.placeholder}
            disabled={disabled.value}
            class={inputInnerClass.value}
            {...otherAttrs}
            onInput={onInput}
            onChange={onChange}
            onBlur={() => formItemContext?.validate('blur').catch(() => {})}
          />
        </div>
      </div>
    );
  },
});
